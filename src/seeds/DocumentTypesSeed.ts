import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { DocumentType } from "../entities/DocumentType.entity.js";
import { MESSAGES } from "../helpers/Messages.js";

export class DocumentTypeSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(DocumentType);

    const documentsType = [
      {
        code: "01",
        documentName: "FACTURA",
        withholdingApply: true,
      },
      {
        code: "03",
        documentName:
          "LIQUIDACIÓN DE COMPRA DE BIENES Y PRESTACIÓN DE SERVICIOS",
        withholdingApply: true,
      },
      {
        code: "04",
        documentName: "NOTA DE CREDITO",
        withholdingApply: false,
      },
      {
        code: "05",
        documentName: "NOTA DE DEBITO",
        withholdingApply: true,
      },
      {
        code: "06",
        documentName: "GUIA DE REMISION",
        withholdingApply: false,
      },
      {
        code: "07",
        documentName: "COMPROBANTE DE RETENCION",
        withholdingApply: false,
      },
    ];

    let created = 0;
    let skipped = 0;
    let mensaje = '';

    for (const doc of documentsType) {
      const exists = await repo.findOne({ where: { documentName: doc.documentName } });
      if (!exists) {
          await repo.insert(doc);
          created++;
          mensaje = 'created';
        } else {
          skipped++;
          mensaje = 'omitted';
        }
    }

    console.log(MESSAGES.SEEDER_SUCCESS("Document_types "+ mensaje, created, skipped));
  }
}
