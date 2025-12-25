import * as bcrypt from "bcrypt";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { Certificate } from "../entities/Certificate.entity.js";
import { Party } from "../entities/Party.entity.js";
import { Role } from "../entities/Role.entity.js";
import { Tenant } from "../entities/Tenant.entity.js";
import { User } from "../entities/User.entity.js";
import { BusinessType } from "../enums/BusinessType.js";
import { CertificateP12State } from "../enums/CertificateP12State.js";
import { MESSAGES } from "../helpers/Messages.js";

export class InitialSystemSetupSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const userRepo    = dataSource.getRepository(User);
    const tenantRepo  = dataSource.getRepository(Tenant);
    const partyRepo   = dataSource.getRepository(Party);
    const certRepo    = dataSource.getRepository(Certificate);
    const roleRepo    = dataSource.getRepository(Role);

    console.log(MESSAGES.SEEDER_START("inicial..."));

    // -------------------------------------------------
    // 1️⃣ Verificar si el SUPER ADMIN GLOBAL ya existe
    // -------------------------------------------------
    const existingAdmin = await partyRepo.findOne({
      where: { email: "admin@system.local" },
    });

    if (existingAdmin) {
      console.log(MESSAGES.SEEDER_EXISTS("SUPER ADMIN"));
      return;
    }

    // -------------------------------------------------
    // 2️⃣ Crear PARTY base para el TENANT principal(identidad legal)
    // -------------------------------------------------
    const mainParty = partyRepo.create({
      identificationNumber: "1799999999001",
      tradeName: "EMPRESA PRINCIPAL",
      companyName: "EMPRESA PRINCIPAL S.A.",
      address: "Av. test123",
      email: "info@empresa.com",
    });

    await partyRepo.save(mainParty);

    // -------------------------------------------------
    // 4️⃣ Crear TENANT principal(MASTER_TENANT)
    // -------------------------------------------------
    const mainTenant = tenantRepo.create({
      party: mainParty,
      businessType: BusinessType.COMMERCE
      // las propiedades opcionales no se definen
    });

    await tenantRepo.save(mainTenant);

    // -------------------------------------------------
    // 3️⃣ Crear certificado base
    // -------------------------------------------------
    const mainCertificate = certRepo.create({
      fileName: "",
      fileKey: "12345678",
      filePath: "/certs/empresa-principal.p12",
      encryptedP12: Buffer.from(""),
      thumbprint: "",
      validFrom: new Date(),
      validTo: new Date(),
      status: CertificateP12State.ACTIVE,
      tenant: mainTenant,
    });

    await certRepo.save(mainCertificate);

    // -------------------------------------------------
    // 5️⃣ Crear el rol SUPER_ADMIN si no existe
    // -------------------------------------------------
    let roleSuperAdmin = await roleRepo.findOne({
      where: { roleName: "SUPER_ADMIN" },
    });

    if (!roleSuperAdmin) {
      roleSuperAdmin = roleRepo.create({
        roleName: "SUPER_ADMIN",
        description: "Administrador global del sistema",
      });
      await roleRepo.save(roleSuperAdmin);
    }

    // -------------------------------------------------
    // 6 Crear SUPER_ADMIN
    // -------------------------------------------------
    const hashed = await bcrypt.hash("SuperAdmin123*", 10);

    const superAdmin = userRepo.create({
      email: "sadmin@dominio.com",
      username: "sadmin", // puedes cambiarlo
      passwordHash: hashed,
      active: true,
      role: roleSuperAdmin,
      tenant: mainTenant, // solo usuario global
    });

    await userRepo.save(superAdmin);


    console.log(MESSAGES.SEEDER_SUCCESS);
  }
}
