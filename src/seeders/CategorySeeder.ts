import type { DataSource } from "typeorm";
import { Category } from "../entities/Category.entity.js";
import type { Seeder } from "./Seeder.js";

export class CategorySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Category);

    const exist = await repo.count();
    if (exist > 0) return; // evita duplicados

    await repo.insert([
      {
        description: "GENERAL",
      },
    ]);

    console.log(" CategorySeeder executed");
  }
}