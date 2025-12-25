import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GlobalState } from '../enums/GlobalState.js';
import { DebitNote } from "./DebitNote.entity.js";
import { PurchasePayment } from "./PurchasePayment.entity.js";
import { SalePayment } from "./SalePayment.entity.js";


@Entity({name: "payment_method"})
export class PaymentMethod {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    length: 2,
    nullable: false,
  })
  code!: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  description!: string;

  @Column({
    type: "enum",
    enum: GlobalState,
    default: GlobalState.ACTIVE,
  })
  status!: GlobalState;

  @OneToMany(() => SalePayment, (sp) => sp.paymentMethod)
  salePayments!: SalePayment[];

  @OneToMany(() => PurchasePayment, (pp) => pp.paymentMethod)
  purchasePayments!: PurchasePayment[];

  @OneToMany(()=> DebitNote, (debitNote) => debitNote.paymentMethod)
  debitNotes!: DebitNote[]

}
