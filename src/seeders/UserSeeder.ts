
import { DataSource } from "typeorm";
import { User } from "../entities/User.entity.js";
import type { Seeder } from "./Seeder.js";


export class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(User);

    const exist = await repo.count();
    if (exist > 0) return; // evita duplicados

    await repo.insert([
      {
        username:       "Omar",
        email:          "omar@example.com",
        passwordHash:   "123456", // en producción, usa hash
      },
    ]);

    console.log(" UserSeeder ejecutado");
  }
}
