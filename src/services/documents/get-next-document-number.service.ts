import { DataSource } from "typeorm";
import { TenantNumbering } from "../../entities/TenantNumbering.entity";


interface GetNextDocumentNumberProps {
  dataSource: DataSource;
  tenantId: string;
  documentTypeId: string;
  establishmentId: string;
  emissionPointId: string;
}

export async function getNextDocumentNumber({
  dataSource,
  tenantId,
  documentTypeId,
  establishmentId,
  emissionPointId,
}: GetNextDocumentNumberProps): Promise<string> {

  return await dataSource.transaction(async (manager) => {
    const repo = manager.getRepository(TenantNumbering);

    // Lock pesimista para evitar concurrencia
    const numbering = await repo.findOne({
      where: {
        tenantId,
        documentType: { id: documentTypeId },
        establishment: { id: establishmentId },
        emissionPoint: { id: emissionPointId },
      },
      relations: ["documentType", "establishment", "emissionPoint"],
      lock: { mode: "pessimistic_write" },
    });

    if (!numbering) {
      throw new Error("Numeración no configurada para este documento");
    }

    const sequence = numbering.nextNumber;

    // Formato SRI
    const formattedNumber =
      `${numbering.establishment.code}-` +
      `${numbering.emissionPoint.code}-` +
      `${String(sequence).padStart(9, "0")}`;

    // Incrementar secuencia
    numbering.nextNumber += 1;
    await repo.save(numbering);

    return formattedNumber;
  });
}