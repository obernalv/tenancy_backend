import { Column, Entity, ManyToOne, OneToMany, Relation } from "typeorm";
import { GlobalState } from "../enums/GlobalState.js";
import { AuditBase } from "./AuditBase.entity.js";
import { PurchaseLiquidationDetail } from "./PurchaseLiquidationDetail.entity.js";
import { SalePayment } from "./SalePayment.entity.js";
import { Supplier } from "./Supplier.entity.js";


@Entity({ name: "purchase_liquidation" })
export class PurchaseLiquidation extends AuditBase {

  @ManyToOne(() => Supplier, (supplier) => supplier)
  supplier: Relation<Supplier>;

  @Column({
    name: "document_number",
    type: "varchar",
    length: 20,
  })
  documentNumber!: string;

  @Column({
    name: "total_price",
    type: "decimal",
    scale: 9,
    precision: 4,
    nullable: false,
  })
  totalPrice!: number;

  @Column({
    name: "total_zero",
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
    name: "guia_number",
    type: "varchar",
    scale: 20,
    nullable: true,
  })
  guiaNumber?: string;

  @Column({
    name: "sale_date",
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

  @OneToMany(
    () => PurchaseLiquidationDetail,
    (detail) => detail.purchase_liquidation
  )
  purchase_liquidation_details: PurchaseLiquidationDetail[];

  // Payment method
  @OneToMany(() => SalePayment, (sp) => sp.sale, { cascade: true })
  payments!: SalePayment[];
}
