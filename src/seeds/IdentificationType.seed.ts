import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { IdentificationType } from "../entities/IdentificationType.entity.js";
import { MESSAGES } from "../helpers/Messages.js";

export  class IdentificationTypeSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const identificationTypeRepo = dataSource.getRepository(IdentificationType);

    const identity = [
      {
        code: "04",
        description: "RUC",
      },
      {
        code: "05",
        description: "CEDULA",
      },
      {
        code: "06",
        description: "PASAPORTE",
      },
      {
        code: "07",
        description: "VENTA CONSUMIDOR FINAL",
      },
      {
        code: "08",
        description: "IDENTIFICAION DEL EXTERIOR",
      },
    ]  

    let created = 0;
    let skipped = 0;
    let mensaje = '';

    for (const identy of identity) {
      const exists = await identificationTypeRepo.findOne({ where: { description: identy.description } });
      if (!exists) {
        await identificationTypeRepo.insert(identy);
        created++;
        mensaje = 'created'
      } else {
        skipped++;
        mensaje = 'omitted'
      }
    }

    console.log(MESSAGES.SEEDER_SUCCESS('Identificacion_types '+ mensaje, created, skipped));

  }
}
