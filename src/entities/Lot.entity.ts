import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { AuditBase } from "./AuditBase.entity.js";
import { Item } from "./Item.entity.js";


@Entity({name: "lots"})
export class Lot extends AuditBase{

  @Column({name: "lot_number", type: 'varchar', length: 50})
  lotNumber!: string;

  @Column({name: "expiration_date", type: "date" })
  expirationDate!: Date;

  @Column({ type: "decimal", precision: 9, scale: 4})
  stock!: number;

  @ManyToOne(() => Item, (item) => item.lots)
  @JoinColumn({ name: "item_id" })
  item: Relation<Item>;

  /** Código interno del proveedor o fábrica (opcional) */
  @Column({name: "manufacturer_code", type: "varchar", nullable: true })
  manufacturerCode?: string;
}
