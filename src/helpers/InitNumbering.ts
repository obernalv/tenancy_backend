import { DataSource } from "typeorm";
import { DocumentType } from "../entities/DocumentType.entity";
import { TenantNumbering } from "../entities/TenantNumbering.entity";

export async function initNumbering(
  dataSource: DataSource,
  tenantId: string
) {
  const numberingRepo = dataSource.getRepository(TenantNumbering);
  const documentTypeRepo = dataSource.getRepository(DocumentType);

  // Tipos de documentos que el SRI exige numeración
  const documentTypes = await documentTypeRepo.find();

  if (!documentTypes.length) {
    throw new Error("No existen document_types en la base de datos");
  }

  // Valores iniciales por defecto SRI
  const DEFAULT_ESTABLISHMENT = "001";
  const DEFAULT_EMISSION_POINT = "001";

  for (const documentType of documentTypes) {
    await numberingRepo.upsert(
      {
        tenantId,
        documentType,
        establishment: DEFAULT_ESTABLISHMENT,
        emissionPoint: DEFAULT_EMISSION_POINT,
        nextNumber: 1,
        prefix: null, // el SRI NO usa prefijos aquí
      },
      {
        conflictPaths: [
          "tenantId",
          "documentType",
          "establishment",
          "emissionPoint",
        ],
      }
    );
  }
}
