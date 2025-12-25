import { DataSource, In } from "typeorm";
import { TenantUnitMeasurement } from "../../entities/TenantUnitMeasurement.entity";
import { UnitMeasurement } from "../../entities/UnitMeasurement.entity";
import { BusinessType } from "../../enums/BusinessType";


export async function assignUnitsToTenant(
  dataSource: DataSource,
  tenantId: string,
  businessType: BusinessType
) {
  const unitRepo = dataSource.getRepository(UnitMeasurement);
  const tenantUnitRepo = dataSource.getRepository(TenantUnitMeasurement);

  let codes: string[] = [];

  switch (businessType) {
    case BusinessType.COMMERCE:
      codes = ["UN", "KG", "L"];
      break;
    case BusinessType.SERVICES:
      codes = ["H", "MES", "SRV"];
      break;
    default:
      const baseUnits = await unitRepo.find({ where: { isBase: true } });
      codes = baseUnits.map((u) => u.code);
  }

  const units = await unitRepo.find({ where: { code: In(codes) } });

  for (const unit of units) {
    await tenantUnitRepo.upsert(
      {
        tenantId,
        unitMeasurement: unit,
        isActive: true,
      },
      ["tenantId", "unitMeasurement"]
    );
  }
}
