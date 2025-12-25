import { DataSource } from "typeorm";
import { TaxType } from "../../entities/TaxType.entity";
import { TenantTax } from "../../entities/TenantTax.entity";

export async function assignTaxesToTenant(
  dataSource: DataSource,
  tenantId: string
) {
  const taxRepo = dataSource.getRepository(TaxType);
  const tenantTaxRepo = dataSource.getRepository(TenantTax);

  const taxes = await taxRepo.find({ where: { isActive: true } });

  for (const tax of taxes) {
    await tenantTaxRepo.upsert(
      {
        tenantId,
        tax,
        isActive: true,
      },
      ["tenantId", "tax"]
    );
  }
}
