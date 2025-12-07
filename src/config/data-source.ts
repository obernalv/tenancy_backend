import dotenv from 'dotenv';
import env from 'env-var';
import { dirname, join } from "path";
import "reflect-metadata";
import { DataSource } from 'typeorm';
import { fileURLToPath } from "url";

dotenv.config();

// Emular __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const DB_TYPE     = env.get('DB_TYPE').required().asEnum(['postgres', 'mysql']);
const DB_HOST     = env.get('DB_HOST').required().asString();
const DB_PORT     = env.get('DB_PORT').default(DB_TYPE === 'postgres' ? '5432' : '3306').asPortNumber();
const DB_USERNAME = env.get('DB_USERNAME').required().asString();
const DB_PASSWORD = env.get('DB_PASSWORD').default('').asString(); //cambiar required
const DB_NAME     = env.get('DB_NAME').required().asString();

// console.log(__dirname, "../entities/**/*.{ts,js}");
export const AppDataSource = new DataSource({
  type: DB_TYPE ,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,

  entities: [
    join(__dirname, "../entities/**/*.{ts,js}")
  
  ],

  migrations: [
    join(__dirname, "../migrations/**/*.{ts,js}")
  ],
  // migrationsTableName: "migrations",
  synchronize: false, // ⚠️ Solo para desarrollo debe estar en true
  logging: false,
});
console.log("Entities cargadas: " , AppDataSource.options.entities);

