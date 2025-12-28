import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Relation
} from "typeorm";
import { GlobalState } from "../enums/GlobalState.js";
import { AuditBase } from "./AuditBase.entity.js";
import { Category } from "./Category.entity.js";
import { CreditNoteDetail } from "./CreditNoteDetail.entity.js";
import { DebitNoteDetail } from "./DebitNoteDetail.entity.js";
import { Lot } from "./Lot.entity.js";
import { PurchaseDetail } from "./PurchaseDetail.entity.js";
import { RemissionGuideDetail } from "./RemissionGuideDetail.entity.js";
import { SaleDetail } from "./SaleDetail.entity.js";
import { Stock } from "./Stock.entity.js";
import { StockMovement } from "./StockMovement.entity.js";
import { Supplier } from "./Supplier.entity.js";
import { UnitMeasurement } from "./UnitMeasurement.entity.js";



@Entity({name: "items"})
// @Index(["tenant_id", "barcode"], { unique: true })
@Index(["barcode"], { unique: true })
export class Item extends AuditBase {

  
  // Categories
  @ManyToOne(() => Category, category => category.items)
  @JoinColumn({name: "category_id"})
  category: Relation<Category>

  //Lots
  @OneToMany(() => Lot, lot => lot.item)
  lots!: Lot[]

  //Measurement
  @ManyToOne(() => UnitMeasurement, u => u.items)
  @JoinColumn({name: "unit_measurement_id"})
  unitMeasurement: Relation<UnitMeasurement>;

  // Suppliers
  @ManyToMany(() => Supplier, (supplier) => supplier.items)
  // @JoinColumn({name: "supplierId"})
  @JoinTable({
    name: "item_suppliers",
    joinColumn: { name: "itemId" },
    inverseJoinColumn: { name: "supplier_id" },
  })
  suppliers!: Supplier[];

  //Stock
  @OneToMany(() => Stock, stock => stock.item)
  stock!: Stock[];

  // Kardex
  @OneToMany(() => StockMovement, kx => kx.item)
  movements!: []

  // Sale detail
  @OneToMany(() => SaleDetail, sd => sd.item)
  sale_details!: []

  @OneToMany(() => RemissionGuideDetail, rgd => rgd.item)
  remissionGuideDetail!: RemissionGuideDetail[]

  @OneToMany(() => CreditNoteDetail, cnd => cnd.item)
  creditNoteDetails!: CreditNoteDetail[];

  @OneToMany(() => DebitNoteDetail, dnd => dnd.item)
  debitNoteDetail!: DebitNoteDetail[];

  @OneToMany(() => PurchaseDetail, pd => pd.item)
  purchaseDetails!: PurchaseDetail[];
  
  @Column({
    // varchar  (para texto normal)
    // text     (para textos largos)
    type: "varchar",
    length: 20,
    nullable: false,
  })
  barcode!: string;

  @Column({
    name: "item_name",
    type: "varchar",
    length: 150,
    nullable: false,
  })
  itemName!: string;

  @Column({
    type: "varchar",
    length: 300,
    nullable: true,
  })
  description?: string;

  @Column({
    name: "unit_price",
    type: "decimal",
    precision: 9,
    scale: 4,
    nullable: false,
  })
  unitPrice!: number;

  @Column({
    name: "sale_price",
    type: "decimal",
    precision: 9, //numeros enteros
    scale: 4, //decimales
    nullable: false,
  })
  salePrice!: number;

  @Column({name: "has_iva", type: 'boolean',})
  hasIva!: boolean;

  // Lista ICE
  @Column({ type: "decimal", precision: 9, scale: 2 })
  ice?: number;

  // Lista IRBPNR
  @Column({ type: "decimal", precision: 9, scale: 2 })
  irbpnr?: number

  @Column({
    name: "control_stock",
    type: "boolean",
    nullable: false,
    default: false
  })
  controlStock!: boolean;

  @Column({
    type: "enum",
    enum: GlobalState,
    nullable: false,
    default: GlobalState.ACTIVE,
  })
  status!: GlobalState;


}


// falta precios al por mayor, promociones