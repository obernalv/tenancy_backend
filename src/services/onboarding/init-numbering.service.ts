import { DataSource } from "typeorm";
import { Tenant } from "../../entities/Tenant.entity";
import { initNumbering } from "../../helpers/InitNumbering";
import { assignTaxesToTenant } from "./assign-taxes.service";
import { assignUnitsToTenant } from "./assign-units.service";
import { createDefaultWarehouse } from "./create-default-warehouse";


export class OnboardingService {
  constructor(private dataSource: DataSource) {}

  async onboardTenant(tenant: Tenant) {
    await this.assignCatalogs(tenant);
    await this.createInfrastructure(tenant);
  }

  private async assignCatalogs(tenant: Tenant) {
    await assignUnitsToTenant(
      this.dataSource,
      tenant.id,
      tenant.businessType
    );

    await assignTaxesToTenant(this.dataSource, tenant.id);
  }

  private async createInfrastructure(tenant: Tenant) {
    await createDefaultWarehouse(this.dataSource, tenant.id);
    await initNumbering(this.dataSource, tenant.id);
  }
}


