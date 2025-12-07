import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { PaymentMethod } from "./PaymentMethod.entity.js";
import { Purchase } from "./Purchase.entity.js";




@Entity({name: "purchase_payments"})
export class PurchasePayment {

   @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column({ type: "decimal", precision: 9, scale: 4 })
  amount!: number;

  @ManyToOne(() => Purchase, purchase => purchase.payments, { onDelete: "CASCADE" })
  @JoinColumn({name: "purchase_id"})
  purchase: Relation<Purchase>;


  @ManyToOne(() => PaymentMethod, pm => pm.purchasePayments)
  @JoinColumn({name: "payment_method_id"})
  paymentMethod: Relation<PaymentMethod>;

}
