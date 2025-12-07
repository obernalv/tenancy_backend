import "reflect-metadata";
import { AppDataSource } from "../config/data-source.js";
import { CategorySeeder } from "./CategorySeeder.js";
import { UserSeeder } from "./UserSeeder.js";


async function runSeeders() {
  try {
    await AppDataSource.initialize();
    console.log("Connected database for seeders");

    const seeders = [
      new UserSeeder(),
      new CategorySeeder(),
        // "Proveedores"
        // "unidades de medida"
        // "Roles"

    ];

    for (const seeder of seeders) {
      await seeder.run(AppDataSource);
    }

    console.log("Seeders executed successfully");
    process.exit();
  } catch (error) {
    console.error("Error running seeders", error);
    process.exit(1);
  }
}

runSeeders();
