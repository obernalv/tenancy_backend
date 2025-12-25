import "reflect-metadata";
import { AppDataSource } from "../config/data-source";
import { CreditNoteReasonSeed } from "./CreditNoteReasonSeed";
import { DocumentTypeSeed } from "./DocumentTypesSeed";
import { IdentificationTypeSeed } from "./IdentificationType.seed";
import { InitialSystemSetupSeed } from "./InitialSystemSetupSeed";
import { MovementReasonSeed } from "./MovementReasonSeed";
import { PaymentMethodSeed } from "./PaymentMethodSeed";
import { RoleSeed } from "./RoleSeed";
import { TaxTypeSeed } from "./TaxTypeSeed";
import { UnitMeasurementSeed } from "./UnitMeasurementSeed";
import { WithholdingTypeSeed } from "./WithholdingTypeSeed";

const seedMap: Record<string, any> = {
  user: InitialSystemSetupSeed, //(user, Tenant, parties, certificate)
  role: RoleSeed,
  identificationType: IdentificationTypeSeed,
  taxType: TaxTypeSeed,
  withholding: WithholdingTypeSeed,
  documentType: DocumentTypeSeed,
  paymentMethod: PaymentMethodSeed,
  movementReason: MovementReasonSeed,
  creditNoteReason: CreditNoteReasonSeed,
  unitMeasurementSeed: UnitMeasurementSeed
};

async function runSeeders() {
  await AppDataSource.initialize();

  const seederName = process.argv[2];

  if (!seederName) {
    console.log("Ejecutando TODOS los seeders");
    for (const Seeder of Object.values(seedMap)) {
      await new Seeder().run(AppDataSource);
    }
  } else {
    const SeederClass = seedMap[seederName];
    if (!SeederClass) {
      throw new Error(`Seeder '${seederName}' no existe`);
    }

    console.log(`Ejecutando seeder: ${seederName}`);
    await new SeederClass().run(AppDataSource);
  }

  process.exit(0);
}

// async function runSeeders() {
//   try {
//     await AppDataSource.initialize();
//     console.log("Connected database for seeders");

//     const seeders = [
//       new InitialSystemSetupSeed(),
//       new RoleSeed(),
//       new IdentificationTypeSeed(),
//       new TaxTypeSeed(),
//       new WithholdingTypeSeed(),
//       new DocumentTypeSeed(),
//       new PaymentMethodSeed(),
//       new MovementReasonSeed(),
//       new CreditNoteReasonSeed()
//     ];

//     for (const seeder of seeders) {
//       await seeder.run(AppDataSource);
//     }

//     console.log("Seeders executed successfully");
//     process.exit();
//   } catch (error) {
//     console.error("Error running seeders", error);
//     process.exit(1);
//   }
// }

runSeeders();

// Ejecutar todos
// npm run seed

// Ejecutar solo 1
// npm run seed tax