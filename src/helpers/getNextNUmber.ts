import { DataSource } from "typeorm";
import { DocumentType } from "../entities/DocumentType.entity";
import { TenantNumbering } from "../entities/TenantNumbering.entity";
import { formatSriNumber } from "./formatSriNumber";


interface GetNextNumberParams {
  tenantId: string;
  documentTypeCode: string;
  establishment: string; // "001"
  emissionPoint: string; // "001"
}

export async function getNextNumber(
  dataSource: DataSource,
  params: GetNextNumberParams
): Promise<string> {
  const { tenantId, documentTypeCode, establishment, emissionPoint } = params;

  return await dataSource.transaction(async (manager) => {
    // 1️. Obtener tipo de documento
    const documentType = await manager.findOne(DocumentType, {
      where: { code: documentTypeCode },
    });

    if (!documentType) {
        //todo: arreglar para mostrar mesnajes personalizados
      throw new Error(`DocumentType ${documentTypeCode} not found`);
    }

    // 2️. Obtener numeración con LOCK
    const numbering = await manager
      .createQueryBuilder(TenantNumbering, "n")
      .setLock("pessimistic_write")
      .where("n.tenant_id = :tenantId", { tenantId })
      .andWhere("n.document_type_id = :documentTypeId", {
        documentTypeId: documentType.id,
      })
      .andWhere("n.establishment = :establishment", { establishment })
      .andWhere("n.emission_point = :emissionPoint", { emissionPoint })
      .getOne();

    if (!numbering) {
        //todo: arreglar para mostrar mesnajes personalizados
      throw new Error(
        `Numbering not configured for ${documentTypeCode} ${establishment}-${emissionPoint}`
      );
    }

    // 3️. Tomar número actual
    const currentNumber = numbering.nextNumber;

    // 4️. Incrementar
    numbering.nextNumber += 1;
    await manager.save(numbering);

    // 5️. Formatear SRI
    const formatted = formatSriNumber(
      establishment,
      emissionPoint,
      currentNumber
    );

    return formatted;
  });
}
