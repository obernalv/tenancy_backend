import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { Role } from "../entities/Role.entity.js";
import { MESSAGES } from "../helpers/Messages";

export class RoleSeed implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Role);

    const roles = [
      { roleName: "ADMIN" },
      { roleName: "USER" },
      { roleName: "INVENTORY" },
    ];

    let created = 0;
    let skipped = 0;
    let mensaje = '';

    for (const role of roles) {
      const exists = await repo.findOne({ where: { roleName: role.roleName } });
      if (!exists) {
        await repo.insert(role);
        created++;
        mensaje = 'created'
      } else {
        skipped++;
        mensaje = 'omitted'
      }
    }

    console.log(MESSAGES.SEEDER_SUCCESS('Roles '+ mensaje, created, skipped));
  }
}
// el seeder de módulos y permisos (RBAC)
// middleware para detectar si el usuario es global o de tenant
