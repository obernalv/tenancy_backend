import { DataSource } from "typeorm";
import { PaymentMethod } from "../entities/PaymentMethod.entity.js";
import { GlobalState } from "../enums/GlobalState.js";
import { MESSAGES } from "../helpers/Messages.js";

export class PaymentMethodSeed {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.transaction(async (manager) => {
      const paymentRepo = manager.getRepository(PaymentMethod);

      const payments = [
        {
          code: "01",
          description: "SIN UTILIZACION DEL SISTEMA FINANCIERO",
          status: GlobalState.ACTIVE,
        },
        {
          code: "15",
          description: "COMPENSACION DE DEUDAS",
          status: GlobalState.ACTIVE,
        },
        {
          code: "16",
          description: "NOTA DE DEBITO",
          status: GlobalState.ACTIVE,
        },
        {
          code: "17",
          description: "DINERO ELECTRONICO",
          status: GlobalState.ACTIVE,
        },
        {
          code: "18",
          description: "TARJETA PREPAGO",
          status: GlobalState.ACTIVE,
        },
        {
          code: "19",
          description: "TARJETA DE CREDITO",
          status: GlobalState.ACTIVE,
        },
        {
          code: "20",
          description: "OTROS SIN UTILIZACION DEL SISTEMA FINANCIERO",
          status: GlobalState.ACTIVE,
        },
        {
          code: "21",
          description: "ENDOSO DE TITULOS",
          status: GlobalState.ACTIVE,
        },
      ];

      let created = 0;
      let skipped = 0;
      let mensaje = "";

      for (const payment of payments) {
        const exists = await paymentRepo.findOne({
          where: { description: payment.description },
        });
        if (!exists) {
          await paymentRepo.insert(payment);
          created++;
          mensaje = "created";
        } else {
          skipped++;
          mensaje = "omitted";
        }
      }

      console.log(MESSAGES.SEEDER_SUCCESS("Payment_methods "+ mensaje, created, skipped));
    });
  }
}
