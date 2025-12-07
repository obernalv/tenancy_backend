import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Item } from "./Item.entity.js";
import { PurchaseLiquidation } from "./PurchaseLiquidation.entity.js";



@Entity({name: "purchase_liquidation_detail"})
export class PurchaseLiquidationDetail {

   @PrimaryGeneratedColumn("uuid")
  id!: number;

  @ManyToOne(
    () => PurchaseLiquidation,
    (purchaseLiquidation) => purchaseLiquidation
  )
    @JoinColumn({ name: "purchase_liquidation_id" })
  purchaseLiquidation: Relation<PurchaseLiquidation>;

  @ManyToOne(() => Item, (item) => item)
  @JoinColumn({ name: "item_id" })
  item: Relation<Item>;

  @Column({
    type: "decimal",
    precision: 9,
    scale: 4,
    nullable: false,
  })
  quantity!: number;

  @Column({
    type: "decimal",
    precision: 9,
    scale: 4,
  })
  unitPrice!: number;

  @Column({
    type: "decimal",
    precision: 9,
    scale: 4,
  })
  discount!: number;

  @Column({
    type: "decimal",
    precision: 9,
    scale: 4,
  })
  tax!: number;
}
