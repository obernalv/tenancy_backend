import { DataSource } from "typeorm";
import { WithholdingType } from "../entities/WithholdingType.entity.js";
import { WithholdingTypeDetail } from "../entities/WithholdingTypeDetail.entity.js";

export class WithholdingTypeSeed {
  async run(dataSource: DataSource): Promise<void> {

    await dataSource.transaction(async (manager) => {

      const withholdingRepo = manager.getRepository(WithholdingType);
      const detailRepo = manager.getRepository(WithholdingTypeDetail);

      //Impuesto a la renta
      let renta = await withholdingRepo.findOne({
        where: { code: "1" },
        relations: ["wdetails"],
      });

      if (!renta) {
        renta = withholdingRepo.create({
          code: "1",
          description: "RENTA",
          isActive: true,
        });
        await withholdingRepo.save(renta);
      }

      const rentaDetails = [
        {
          code: "",
          description: "",
          percentage: 0,
        },
      ];

      for (const detail of rentaDetails) {
        const exists = await detailRepo.findOne({
          where: {
            withholdingType: { id: renta.id },
          },
        });

        if (!exists) {
          await detailRepo.save(
            detailRepo.create({
              ...detail,
              withholdingType: renta,
            })
          );
        }
      }

      //Retencion del IVA
      let iva = await withholdingRepo.findOne({
        where: { code: "2" },
        relations: ["wdetails"],
      });

      if (!iva) {
        iva = withholdingRepo.create({
          code: "2",
          description: "IVA",
          isActive: true,
        });
        await withholdingRepo.save(iva);
      }

      const ivaDetails = [
        {
          code: "7",
          description: "0%",
          percentage: 0,
        },
        {
          code: "8",
          description: "NO PROCEDE RETENCION",
          percentage: 0,
        },
        {
          code: "9",
          description: "10%",
          percentage: 10,
        },
        {
          code: "10",
          description: "20%",
          percentage: 20,
        },
        {
          code: "1",
          description: "30%",
          percentage: 30,
        },
        {
          code: "11",
          description: "50%",
          percentage: 50,
        },
        {
          code: "2",
          description: "70%",
          percentage: 70,
        },
        {
          code: "3",
          description: "100%",
          percentage: 100,
        },
      ];

      for (const detail of ivaDetails) {
        const exists = await detailRepo.findOne({
          where: {
            withholdingType: { id: iva.id },
          },
        });

        if (!exists) {
          await detailRepo.save(
            detailRepo.create({
              ...detail,
              withholdingType: iva,
            })
          );
        }
      }

      //Retencion ISD(impuesto a la salida de divisas)
      let isd = await withholdingRepo.findOne({
        where: { code: "6" },
        relations: ["wdetails"],
      });

      if (!isd) {
        isd = withholdingRepo.create({
          code: "6",
          description: "ISD",
          isActive: true,
        });
        await withholdingRepo.save(isd);
      }

      const isbDetails = [
        {
          code: "4586",
          description: "2.5%",
          percentage: 2.5,
        },
      ];

      for (const detail of isbDetails) {
        const exists = await detailRepo.findOne({
          where: {
            withholdingType: { id: isd.id },
          },
        });

        if (!exists) {
          await detailRepo.save(
            detailRepo.create({
              ...detail,
              withholdingType: isd,
            })
          );
        }
      }
      
    });
  }
}
