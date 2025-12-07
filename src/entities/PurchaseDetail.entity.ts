import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { Item } from "./Item.entity.js";
import { Purchase } from "./Purchase.entity.js";


@Entity({ name: "purchase_detail" })
export class PurchaseDetail{

   @PrimaryGeneratedColumn("uuid")
  id!: number;

  @ManyToOne(() => Purchase, purchase => purchase.purchase_detail, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "purchase_id" })
  purchase: Relation<Purchase>;

  @ManyToOne(() => Item, item => item.purchaseDetails)
  @JoinColumn({ name: "item_id" })
  item: Relation<Item>;

  @Column({
    type: "decimal",
    precision: 9,
    scale: 4
  })
  quantity!: number;

  @Column({
    type: "decimal",
    precision: 9,
    scale: 4
  })
  discount!: number;

  @Column({
    type: "decimal",
    precision: 9,
    scale: 4
  })
  tax!: number;
}
