import { DataSource } from "typeorm";
import { CreditNoteReason } from "../entities/CreditNoteReason.entity.js";
import { MESSAGES } from "../helpers/Messages.js";
export class CreditNoteReasonSeed {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(CreditNoteReason);

    const reasons = [
      {
        code: "",
        description: "DEVOLUCION",
        isActive: true
      },
      {
        code: "",
        description: "DESCUENTO",
        isActive: true
      },
      {
        code: "",
        description: "BONIFICACION",
        isActive: true
      },
      {
        code: "",
        description: "ANULACION",
        isActive: true
      },
      {
        code: "",
        description: "OTROS",
        isActive: true
      },
    ];

    let created = 0;
    let skipped = 0;
    let mensaje = '';

    for (const reason of reasons) {
      const exists = await repo.findOne({
        where: { description: reason.description },
      });
      if (!exists) {
        await repo.insert(reason);
        created++;
        mensaje = 'created'
      } else {
        skipped++;
        mensaje = 'omitted'
      }
    }

    console.log(
      MESSAGES.SEEDER_SUCCESS("Credit_note_reasons " + mensaje, created, skipped)
    );
  }
}
