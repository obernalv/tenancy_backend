import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { PaymentMethod } from "./PaymentMethod.entity.js";
import { Sale } from "./Sale.entity.js";


@Entity({name: "sale_payments"})
export class SalePayment {
  
 @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  amount!: number;

  @ManyToOne(() => Sale, (sale) => sale.payments, { onDelete: "CASCADE" })
  @JoinColumn({name: "sale_id"})
  sale: Relation<Sale>;


  @ManyToOne(() => PaymentMethod, (pm) => pm.salePayments, { eager: true })
  @JoinColumn({name: "payment_method_id"})
  paymentMethod: Relation<PaymentMethod>;

}
