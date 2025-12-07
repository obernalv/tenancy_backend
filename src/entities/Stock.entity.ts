import { Column, Entity, Index, JoinColumn, ManyToOne, Relation } from "typeorm";
import { AuditBase } from "./AuditBase.entity.js";
import { Item } from "./Item.entity.js";
import { Warehouse } from "./WareHouse.entity.js";


@Entity({ name: "stock" })
// indice compuesto para acelerar consultas
// @Index(["tenant_id", "item_id", "warehouse_id"], { unique: false })
@Index(["item_id", "warehouse_id"], { unique: false })
export class Stock extends AuditBase {

  @Column({ type: "decimal", precision: 9, scale: 4, default: 0 })
  quantity!: number;

  @Column({ type: "decimal", precision: 9, scale: 4, default: 0 })
  reserved!: number;

  @ManyToOne(() => Item, (item) => item.stock)
  @JoinColumn({ name: "item_id" })
  item: Relation<Item>;

  // debe ser declarado de manera implicta por que usa index
  @Column({ type: "uuid" })
  item_id!: string;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.stock)
  @JoinColumn({ name: "warehouse_id" })
  warehouse: Relation<Warehouse>;

  // debe ser declarado de manera implicta por que usa index
  @Column({ type: "uuid" })
  warehouse_id!: string;
}