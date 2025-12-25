import { DataSource } from "typeorm";
import { TaxDetailType } from "../entities/TaxDetailType.entity.js";
import { TaxType } from "../entities/TaxType.entity.js";
import { MESSAGES } from "../helpers/Messages";

export class TaxTypeSeed {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.transaction(async (manager) => {
      const taxRepo = manager.getRepository(TaxType);
      const detailRepo = manager.getRepository(TaxDetailType);

      let iva = await taxRepo.findOne({
        where: { code: "2" },
        relations: ["taxDetails"],
      });

      if (!iva) {
        iva = taxRepo.create({
          code: "2",
          description: "IVA",
          isActive: true,
        });
        await taxRepo.save(iva);
      }

      const ivaDetails = [
        {
          code: "0",
          description: "0%",
          percentage: 0,
        },
        {
          code: "2",
          description: "12%",
          percentage: 12,
        },
        {
          code: "3",
          description: "14%",
          percentage: 14,
        },
        {
          code: "4",
          description: "15%",
          percentage: 15,
        },
        {
          code: "5",
          description: "5%",
          percentage: 5,
        },
        {
          code: "6",
          description: "OBJETO DE IMPUESTO",
          percentage: 0,
        },
        {
          code: "7",
          description: "EXCENTO DE IVA",
          percentage: 0,
        },
        {
          code: "8",
          description: "IVA DIFERENCIADO",
          percentage: 0,
        },
        {
          code: "10",
          description: "13%",
          percentage: 13,
        },
      ];


      for (const detail of ivaDetails) {
        const exists = await detailRepo.findOne({
          where: {
            tax: { id: iva.id },
          },
        });

        if (!exists) {
          await detailRepo.save(
            detailRepo.create({
              ...detail,
              tax: iva,
            })
          );
        }
      }

      // ICE
      let ice = await taxRepo.findOne({
        where: { code: "3" },
        relations: ["taxDetails"],
      });

      if (!ice) {
        ice = taxRepo.create({
          code: "3",
          description: "ICE",
          isActive: true,
        });
        await taxRepo.save(ice);
      }

      const iceDetails = [
        {
          code: "3011",
          description: "ICE Cigarrillos Rubios",
          percentage: 0,
        },
        {
          code: "3021",
          description: "ICE Cigarrillos Negros",
          percentage: 0,
        },
        {
          code: "3023",
          description: "ICE Productos del Tabaco y Sucedáneos del Tabaco excepto Cigarrillos",
          percentage: 0,
        },
        {
          code: "3031",
          description: "ICE Bebidas Alcohólicas",
          percentage: 0,
        },
        {
          code: "3041",
          description: "ICE Cerveza Industrial Gran Escala",
          percentage: 0,
        },
        {
          code: "3041",
          description: "ICE Cerveza Industrial Mediana Escala ",
          percentage: 0,
        },
        {
          code: "3041",
          description: "ICE Cerveza Industrial Pequeña Escala",
          percentage: 0,
        },
        {
          code: "3073",
          description: "ICE Vehículos Motorizados cuyo PVP sea hasta de 20000 USD",
          percentage: 0,
        },
        {
          code: "3075",
          description: "ICE Vehículos Motorizados PVP entre 30000 y 40000",
          percentage: 0,
        },
        {
          code: "3077",
          description: "ICE Vehículos Motorizados cuyo PVP superior USD 40.000 hasta 50.000",
          percentage: 0,
        },
        {
          code: "3078",
          description: "ICE Vehículos Motorizados cuyo PVP superior USD 50.000 hasta 60.000",
          percentage: 0,
        },
        {
          code: "3079",
          description: "ICE Vehículos Motorizados cuyo PVP superior USD 60.000 hasta 70.000",
          percentage: 0,
        },
        {
          code: "3080",
          description: "ICE Vehículos Motorizados cuyo PVP superior USD 70.000",
          percentage: 0,
        },
        {
          code: "3081",
          description: "ICE Aviones, Tricares, yates, Barcos de Recreo",
          percentage: 0,
        },
        {
          code: "3092",
          description: "ICE Servicios de Televisión Prepagada",
          percentage: 0,
        },
        {
          code: "3610",
          description: "ICE Perfumes y Aguas de Tocador",
          percentage: 0,
        },
        {
          code: "3620",
          description: "ICE Videojuegos",
          percentage: 0,
        },
        {
          code: "3630",
          description: "ICE Armas de Fuego, Armas deportivas y Municiones",
          percentage: 0,
        },
        {
          code: "3640",
          description: "ICE Focos Incandescentes",
          percentage: 0,
        },
        {
          code: "3660",
          description: "ICE Cuotas Membresías Afiliaciones Acciones",
          percentage: 0,
        },
        {
          code: "3093",
          description: "ICE Servicios Telefonía Sociedade",
          percentage: 0,
        },
        {
          code: "3101",
          description: "ICE Bebidas Energizantes",
          percentage: 0,
        },
        {
          code: "3053",
          description: "ICE Bebidas Gaseosas con Alto Contenido de Azúcar",
          percentage: 0,
        },
        {
          code: "3054",
          description: "ICE Bebidas Gaseosas con Bajo Contenido de Azúcar",
          percentage: 0
        },
        {
          code: "3111",
          description: "ICE Bebidas No Alcohólicas",
          percentage: 0
        },
        {
          code: "3043",
          description: "ICE Cerveza Artesanal",
          percentage: 0
        },
        {
          code: "3033",
          description: "ICE Alcohol",
          percentage: 0
        },
        {
          code: "3671",
          description: "ICE calefones y sistemas de calentamiento de agua a gas SRI",
          percentage: 0
        },
        {
          code: "3684",
          description: "ICE vehículos motorizados camionetas y de rescate cuyo PVP sea hasta DE 30.000 USD",
          percentage: 0
        },
        {
          code: "3686",
          description: "ICE vehículos motorizados excepto camionetas y de rescate cuyo PVP sea superior USD 20.000 hasta DE 30.000",
          percentage: 0
        },
        {
          code: "3688",
          description: "ICE vehículos híbridos cuyo PVP sea de hasta USD. 35.000 ",
          percentage: 0
        },
        {
          code: "3691",
          description: "ICE vehículos híbridos cuyo PVP superior USD. 35.000 hasta 40.000",
          percentage: 0
        },
        {
          code: "3692",
          description: "ICE vehículos híbridos cuyo PVP superior USD. 40.000 hasta 50.000",
          percentage: 0
        },
        {
          code: "3695",
          description: "ICE vehículos híbridos cuyo PVP superior USD. 50.000 hasta 60.000",
          percentage: 0
        },
        {
          code: "3696",
          description: "ICE vehículos híbridos cuyo PVP superior USD. 60.000 hasta 70.000 ",
          percentage: 0
        },
        {
          code: "3698",
          description: "ICE vehículos híbridos cuyo PVP superior a USD 70.000",
          percentage: 0
        },
        {
          code: "3682",
          description: "ICE consumibles tabaco calentado y líquidos con nicotina SRI",
          percentage: 0
        },
        {
          code: "3681",
          description: "ICE servicios de telefonía móvil personas naturales",
          percentage: 0
        },
        {
          code: "3680",
          description: "ICE fundas plásticas",
          percentage: 0
        },
        {
          code: "3533",
          description: "ICE Import. Bebidas Alcohólicas",
          percentage: 0
        },
        {
          code: "3541",
          description: "ICE Cerveza Gran Escala CAE",
          percentage: 0
        },
        {
          code: "3541",
          description: "ICE Cerveza Industrial de Mediana Escala CAE",
          percentage: 0
        },
        {
          code: "3541",
          description: "ICE Cerveza Industrial de Pequeña Escala CAE",
          percentage: 0
        },
        {
          code: "3542",
          description: "ICE Cigarrillos Rubios CAE",
          percentage: 0
        },
        {
          code: "3543",
          description: "ICE Cigarrillos Negros CAE",
          percentage: 0
        },
        {
          code: "3544",
          description: "ICE Productos del Tabaco y Sucedáneos del Tabaco Excepto Cigarrillos CAE ",
          percentage: 0
        },
        {
          code: "3581",
          description: "ICE Aeronaves CAE ",
          percentage: 0
        },
        {
          code: "3582",
          description: "ICE Aviones, Avionetas y Helicópteros Exct. Aquellos destinados Al Trans. CAE",
          percentage: 0
        },
        {
          code: "3710",
          description: "ICE Perfumes Aguas de Tocador Cae",
          percentage: 0
        },
        {
          code: "3730",
          description: "ICE Importaciones Armas de Fuego, Armas deportivas y Municiones CAE",
          percentage: 0
        },
        {
          code: "3740",
          description: "ICE Focos Incandescentes CAE",
          percentage: 0
        },
        {
          code: "3871",
          description: " ICE-vehículos motorizados cuyo PVP SEA hasta de 20000 USD SENAE ",
          percentage: 0
        },
        {
          code: "3873",
          description: "ICE-vehículos motorizados PVP entre 30000 Y 40000 SENAE ",
          percentage: 0
        },
        {
          code: "3874",
          description: "ICE-vehículos motorizados cuyo PVP superior USD 40.000 hasta 50.000 SENAE",
          percentage: 0
        },
        {
          code: "3875",
          description: "ICE-vehículos motorizados cuyo PVP superior USD 50.000 hasta 60.000 SENAE",
          percentage: 0
        },
        {
          code: "3876",
          description: "ICE-vehículos motorizados cuyo PVP superior USD 60.000 hasta 70.000 SENAE ",
          percentage: 0
        },
        {
          code: "3877",
          description: "ICE-vehículos motorizados cuyo PVP superior USD 70.000 SENAE",
          percentage: 0
        },
        {
          code: "3878",
          description: "ICE-Aviones, Tricares, Yates, Barcos de Rec SENAE",
          percentage: 0
        },
        {
          code: "3601",
          description: "ICE Bebidas Energizantes SENAE",
          percentage: 0
        },
        {
          code: "3552",
          description: "ICE bebidas gaseosas con alto contenido de azúcar SENAE",
          percentage: 0
        },
        {
          code: "3553",
          description: "ICE bebidas gaseosas con bajo contenido de azúcar SENAE",
          percentage: 0
        },
        {
          code: "3602",
          description: "ICE bebidas no alcohólicas SENAE",
          percentage: 0
        },
        {
          code: "3545",
          description: "ICE cerveza artesanal SENAE",
          percentage: 0
        },
        {
          code: "3532",
          description: "ICE Import. alcohol SENAE",
          percentage: 0
        },
        {
          code: "3671",
          description: "ICE calefones y sistemas de calentamiento de agua a gas SRI",
          percentage: 0
        },
        {
          code: "3771",
          description: "ICE calefones y sistemas de calentamiento de agua a gas SENAE ",
          percentage: 0
        },
        {
          code: "3685",
          description: "ICE vehículos motorizados camionetas y de rescate PVP sea hasta DE 30.000 USD SENAE",
          percentage: 0
        },
        {
          code: "3687",
          description: "ICE vehículos motorizados excepto camionetas y de rescate cuyo PVP sea superior USD 20.000 hasta de 30.000 SENAE",
          percentage: 0
        },
        {
          code: "3687",
          description: "ICE vehículos híbridos cuyo PVP sea de hasta USD. 35.000 SENAE",
          percentage: 0
        },
        {
          code: "3690",
          description: "ICE vehículos híbridos cuyo PVP superior USD. 35.000 hasta 40.000 SENAE",
          percentage: 0
        },
        {
          code: "3693",
          description: " ICE vehículos híbridos cuyo PVP superior USD. 40.000 hasta 50.000 SENAE ",
          percentage: 0
        },
        {
          code: "3694",
          description: "ICE vehículos híbridos cuyo PVP superior USD. 50.000 hasta 60.000 SENAE ",
          percentage: 0
        },
        {
          code: "3697",
          description: "ICE vehículos híbridos cuyo PVP superior USD. 60.000 hasta 70.000 SENAE",
          percentage: 0
        },
        {
          code: "3699",
          description: "ICE vehículos híbridos cuyo PVP superior a USD 70.000 SENAE",
          percentage: 0
        },
        {
          code: "3683",
          description: "ICE consumibles tabaco calentado y líquidos con nicotina SENAE ",
          percentage: 0
        }
      ];

      for (const detail of iceDetails) {
        const exists = await detailRepo.findOne({
          where: {
            tax: { id: ice.id },
            // percentage: detail.percentage,
          },
        });

        if (!exists) {
          await detailRepo.save(
            detailRepo.create({
              ...detail,
              tax: ice,
            })
          );
        }
      }

      // IRBPNR(Impuesto Redimible a las Botellas Plásticas)
      let irb = await taxRepo.findOne({
        where: { code: "5"},
        relations: ["taxDetails"]
      })

      if(!irb){
        irb = taxRepo.create({
          code: "5",
          description: "IRBPNR",
          isActive: true,
        });
        await taxRepo.save(irb);
      }

      const irbDetails = [

      ]
    });

    console.log(MESSAGES.SEEDER_SUCCESS("Taxes_type"));
  }
}
