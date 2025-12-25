import { DataSource } from "typeorm";
import { Warehouse } from "../../entities/WareHouse.entity";

export async function createDefaultWarehouse(
  dataSource: DataSource,
  tenantId: string
) {
  const repo = dataSource.getRepository(Warehouse);

  const exists = await repo.findOne({
    where: { tenantId, isMain: true },
  });

  if (exists) return;

  await repo.insert({
    tenantId,
    warehouseName: "BODEGA PRINCIPAL",
    isMain: true,
    isActive: true,
  });
}
