import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { UnitMeasurement } from '../entities/UnitMeasurement.entity';
import { UnitMeasurementType } from "../enums/UnitMeasurementType";
import { MESSAGES } from "../helpers/Messages";

export class UnitMeasurementSeed implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(UnitMeasurement);

    const units = [
      // 🔹 BASE
      { code: "UN", description: "UNIDAD", type: UnitMeasurementType.UNIT, symbol: "un", isBase: true },
      { code: "KG", description: "KILOGRAMO", type: UnitMeasurementType.WEIGHT, symbol: "kg", isBase: true },
      { code: "M", description: "METRO", type: UnitMeasurementType.LENGTH, symbol: "m", isBase: true },
      { code: "L", description: "LITRO", type: UnitMeasurementType.VOLUME, symbol: "l", isBase: true },
      { code: "M2", description: "METRO CUADRADO", type: UnitMeasurementType.AREA, symbol: "m²", isBase: true },
      { code: "H", description: "HORA", type: UnitMeasurementType.TIME, symbol: "h", isBase: true },
      { code: "SRV", description: "SERVICIO", type: UnitMeasurementType.SERVICE, symbol: "srv", isBase: true },

      // 🔹 DERIVADAS
      { code: "G", description: "GRAMO", type: UnitMeasurementType.WEIGHT, symbol: "g", baseCode: "KG", conversionFactor: 0.001 },
      { code: "LB", description: "LIBRA", type: UnitMeasurementType.WEIGHT, symbol: "lb", baseCode: "KG", conversionFactor: 0.453592 },
      { code: "TN", description: "TONELADA", type: UnitMeasurementType.WEIGHT, symbol: "tn", baseCode: "KG", conversionFactor: 1000 },

      { code: "CM", description: "CENTÍMETRO", type: UnitMeasurementType.LENGTH, symbol: "cm", baseCode: "M", conversionFactor: 0.01 },
      { code: "MM", description: "MILÍMETRO", type: UnitMeasurementType.LENGTH, symbol: "mm", baseCode: "M", conversionFactor: 0.001 },
      { code: "KM", description: "KILÓMETRO", type: UnitMeasurementType.LENGTH, symbol: "km", baseCode: "M", conversionFactor: 1000 },

      { code: "ML", description: "MILILITRO", type: UnitMeasurementType.VOLUME, symbol: "ml", baseCode: "L", conversionFactor: 0.001 },

      // 🔹 OTRAS
      { code: "PZA", description: "PIEZA", type: UnitMeasurementType.UNIT, symbol: "pza", isBase: true },
      { code: "CJ", description: "CAJA", type: UnitMeasurementType.UNIT, symbol: "cj", isBase: true },
      { code: "PQ", description: "PAQUETE", type: UnitMeasurementType.UNIT, symbol: "pq", isBase: true },
      { code: "DOC", description: "DOCENA", type: UnitMeasurementType.UNIT, symbol: "doc", isBase: true },
      { code: "LOT", description: "LOTE", type: UnitMeasurementType.SERVICE, symbol: "lot", isBase: true },
    ];

    let created = 0;
    let skipped = 0;

    for (const unit of units) {
      const exists = await repo.findOne({ where: { code: unit.code } });
      if (exists) {
        skipped++;
        continue;
      }

      let baseUnit: UnitMeasurement | null = null;

      if (unit.baseCode) {
        baseUnit = await repo.findOneByOrFail({ code: unit.baseCode });
      }

      await repo.insert({
        code: unit.code,
        description: unit.description,
        type: unit.type,
        symbol: unit.symbol,
        isBase: unit.isBase ?? false,
        baseUnit,
        conversionFactor: unit.conversionFactor ?? null,
        isActive: true,
      });

      created++;
    }

    console.log(
      MESSAGES.SEEDER_SUCCESS("UnitMeasurement", created, skipped)
    );
  }
}
