import { DataSource } from "typeorm";
import { DocumentType } from "../../entities/DocumentType.entity";
import { TenantEmissionPoint } from "../../entities/TenantEmissionPoint.entity";
import { TenantEstablishment } from "../../entities/TenantEstablishment.entity";
import { TenantNumbering } from "../../entities/TenantNumbering.entity";


interface InitTenantNumberingProps {
  dataSource: DataSource;
  tenantId: string;
}

export async function initTenantNumbering({
  dataSource,
  tenantId,
}: InitTenantNumberingProps): Promise<void> {

  const documentTypeRepo = dataSource.getRepository(DocumentType);
  const numberingRepo = dataSource.getRepository(TenantNumbering);
  const establishmentRepo = dataSource.getRepository(TenantEstablishment);
  const emissionRepo = dataSource.getRepository(TenantEmissionPoint);

  // 1️⃣ Obtener o crear establecimiento 001
  let establishment = await establishmentRepo.findOne({
    where: { tenantId, code: "001" },
  });

  if (!establishment) {
    establishment = await establishmentRepo.save({
      tenantId,
      code: "001",
      name: "MATRIZ",
      isActive: true,
    });
  }

  // 2️⃣ Obtener o crear punto de emisión 001
  let emissionPoint = await emissionRepo.findOne({
    where: {
      code: "001",
      establishment: { 
        id: establishment.id 
      },
    },
    relations: ["establishment"],
  });

  if (!emissionPoint) {
    emissionPoint = await emissionRepo.save({
      code: "001",
      name: "PUNTO PRINCIPAL",
      establishment,
      isActive: true,
    });
  }

  // 3️⃣ Crear numeración por tipo de documento
  const documentTypes = await documentTypeRepo.find();

  for (const docType of documentTypes) {
    const exists = await numberingRepo.findOne({
      where: {
        tenantId,
        documentType: { id: docType.id },
        establishment: { id: establishment.id },
        emissionPoint: { id: emissionPoint.id },
      },
      relations: ["documentType", "establishment", "emissionPoint"],
    });

    if (exists) continue;

    await numberingRepo.save({
      tenantId,
      documentType: docType,
      establishment,
      emissionPoint,
      nextNumber: 1,
      prefix: null,
    });
  }

  console.log(`Numeración inicial SRI creada para tenant ${tenantId}`);
}
