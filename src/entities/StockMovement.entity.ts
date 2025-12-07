import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { TypeMovementKardex } from "../enums/TypeMovementKardex.js";
import { AuditBase } from "./AuditBase.entity.js";
import { Item } from "./Item.entity.js";
import { MovementReason } from "./MovementReason.entity.js";
import { Warehouse } from "./WareHouse.entity.js";


@Entity({ name: "stock_movement" })
export class StockMovement extends AuditBase {
  @Column({type: "date"})
  dateMovement!: Date;

  @Column({
    type: "enum",
    enum: TypeMovementKardex,
    default: TypeMovementKardex.IN,
  })
  typeMovement!: TypeMovementKardex;

  @Column({ type: "decimal", precision: 9, scale: 4 })
  quantity!: number;

  @Column({ type: "decimal", precision: 9, scale: 4 })
  unitCost!: number;

  @Column({ type: "decimal", precision: 9, scale: 4 })
  balance!: number;

  @ManyToOne(() => Item, (item) => item.movements)
  @JoinColumn({ name: "item_id" })
  item: Relation<Item>;

  @ManyToOne( () => MovementReason, (movementReason) => movementReason.stockMovement)
  @JoinColumn({ name: "reason_id" })
  reason: Relation<MovementReason>;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.movements)
  @JoinColumn({ name: "warehouse_id" })
  warehouse: Relation<Warehouse>;
}
