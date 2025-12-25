import { UnitMeasurement } from "../entities/UnitMeasurement.entity";

export class UnitConversionService {

  static convert(
    value: number,
    from: UnitMeasurement,
    to: UnitMeasurement
  ): number {

    if (from.type !== to.type) {
      throw new Error("Cannot convert between different unit types");
    }

    // Caso simple: misma unidad
    if (from.id === to.id) {
      return value;
    }

    // Convertir a unidad base
    const valueInBase = from.isBase
      ? value
      : value * Number(from.conversionFactor);

    // Convertir de base a destino
    if (to.isBase) {
      return valueInBase;
    }

    return valueInBase / Number(to.conversionFactor);
  }
}

/* Esto se usa en:
  stock
  compras
  ventas
  reportes
  SRI
*/