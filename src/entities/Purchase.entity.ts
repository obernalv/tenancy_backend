import { Column, Entity, OneToMany } from "typeorm";
import { GlobalState } from "../enums/GlobalState.js";
import { AuditBase } from "./AuditBase.entity.js";
import { PurchaseDetail } from "./PurchaseDetail.entity.js";
import { PurchasePayment } from "./PurchasePayment.entity.js";



@Entity({name: "purchases"})
export class Purchase extends AuditBase{

  @OneToMany(() => PurchaseDetail, detail => detail.purchase, { cascade: true })
  purchase_detail!: PurchaseDetail[];

  @OneToMany(() => PurchasePayment, pp => pp.purchase, { cascade: true })
  payments!: PurchasePayment[];

  @Column({
    type: "varchar",
    length: 20,
  })
  documentNro!: string;

  @Column({
    type: "decimal",
    precision: 9,
    scale: 4
  })
  totalPrice!: number;

  @Column({
    type: "decimal",
    precision: 9,
    scale: 4
  })
  totalZero!: number;

  @Column({
    type: "decimal",
    precision: 9,
    scale: 4
  })
  tax!: number;

  @Column({
    type: "varchar", 
    nullable: true,
    length: 100,
  })
  observations?: string;

  @Column({
    type: "varchar",
    length: 20,
  })
  guiaNumber?: string;

  @Column({
    type: "enum",
    enum: GlobalState,
    default: GlobalState.ACTIVE
  })
  status!: GlobalState;

  @Column({
    type: "date",
  })
  purchaseDate!: Date | null;

}