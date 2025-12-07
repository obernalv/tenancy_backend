import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { GlobalState } from "./../enums/GlobalState.js";
import { AuditBase } from "./AuditBase.entity.js";
import { CreditNote } from "./CreditNote.entity.js";
import { Customer } from "./Customer.entity.js";
import { DebitNote } from "./DebitNote.entity.js";
import { SaleDetail } from "./SaleDetail.entity.js";
import { SalePayment } from "./SalePayment.entity.js";



@Entity({ name: "sales" })
export class Sale extends AuditBase {
  @Column({
    type: "varchar",
    length: 20,
  })
  documentNumber!: string;

  @Column({
    type: "decimal",
    scale: 9,
    precision: 4,
    nullable: false,
  })
  totalPrice!: number;

  @Column({
    type: "decimal",
    scale: 9,
    precision: 4,
    nullable: false,
  })
  totalZero!: number;

  @Column({
    type: "decimal",
    scale: 9,
    precision: 4,
    nullable: false,
  })
  tax!: number;

  @Column({
    type: "decimal",
    scale: 9,
    precision: 4,
    nullable: true,
  })
  observations?: number;

  @Column({
    type: "varchar",
    scale: 20,
    nullable: true,
  })
  guiaNumber?: string;

  @Column({
    type: "date",
    nullable: false,
  })
  saleDate!: Date;

  @Column({
    type: "enum",
    enum: GlobalState,
    nullable: false,
    default: GlobalState.ACTIVE,
  })
  status!: GlobalState;

  // Customer detail
  @ManyToOne(() => Customer, (customer) => customer.sales)
  @JoinColumn({ name: "customer_id" })
  customer!: Customer;


  // Sale details
  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.sale)
  saleDetail!: SaleDetail[];

  // Payment method
  @OneToMany(() => SalePayment, (sp) => sp.sale, { cascade: true })
  payments!: SalePayment[];

  // Debits notes
  @OneToMany(() => DebitNote, (debitN) => debitN.sale)
  debitNotes!: DebitNote[];

  // Credit notes
  @OneToMany(() => CreditNote, (creditN) => creditN.sale)
  creditNotes!: CreditNote[];
}
