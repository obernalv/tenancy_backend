import { DataSource } from "typeorm";
import { MovementReason } from "../entities/MovementReason.entity.js";
import { MESSAGES } from "../helpers/Messages.js";

export class MovementReasonSeed {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.transaction(async (manager) => {
      const repo = manager.getRepository(MovementReason);

      const movementR = [
        {
          code: "VEN",
          description: "VENTA DE BIENES",
          isForKardex: true,
          isForGuia: true,
          isForInventoryAdjustment: false,
        },
        {
          code: "COM",
          description: "COMPRA DE BIENES",
          isForKardex: true,
          isForGuia: true,
          isForInventoryAdjustment: false,
        },
        {
          code: "DEV",
          description: "DEVOLUCIÓN",
          isForKardex: true,
          isForGuia: true,
          isForInventoryAdjustment: false,
        },
        {
          code: "TRA",
          description: "TRASLADO ENTRE ESTABLECIMIENTOS",
          isForKardex: true,
          isForGuia: true,
          isForInventoryAdjustment: false,
        },
        {
          code: "SER",
          description: "PRESTACION DE SERVICIOS",
          isForKardex: true,
          isForGuia: true,
          isForInventoryAdjustment: false,
        },
        {
          code: "REC",
          description: "RECOJO DE BIENES TRANSFORMADOS",
          isForKardex: true,
          isForGuia: true,
          isForInventoryAdjustment: false,
        },
        {
          code: "AJU",
          description: "AJUSTE DE INVENTARIO",
          isForKardex: true,
          isForGuia: true,
          isForInventoryAdjustment: false,
        },
      ];

      let created = 0;
      let skipped = 0;
      let mensaje = '';

      for (const mov of movementR) {
        const exists = await repo.findOne({
          where: { code: mov.code },
        });

        if (!exists) {
          await repo.insert(mov);
          created++;
          mensaje = 'created';
        } else {
          skipped++;
          mensaje = 'omitted';
        }
      }

      console.log(
        MESSAGES.SEEDER_SUCCESS('Movement_Reason '+ mensaje, created, skipped)
      );
    });
  }
}
