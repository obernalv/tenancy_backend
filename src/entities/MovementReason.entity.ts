import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RemissionGuide } from "./RemissionGuide.entity.js";
import { StockMovement } from "./StockMovement.entity.js";



@Entity({ name: "movement_reason" })
export class MovementReason {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 3, unique: true })
  code!: string; // Ej: VEN, COM, DEV, TRA, SER, REC

  @Column({ type: "varchar", length: 150 })
  description!: string;

  @Column({ name: "is_for_kardex", type: "boolean", default: true })
  isForKardex!: boolean;

  @Column({ name: "is_for_guia", type: "boolean", default: true })
  isForGuia!: boolean;

  @Column({ name: "is_for_inventory_adjustment", type: "boolean", default: true })
  isForInventoryAdjustment!: boolean;

  @OneToMany(() => StockMovement, (stockMovement) => stockMovement.reason)
  stockMovement!: StockMovement[];

  @OneToMany(() => RemissionGuide, (remisionGuide) => remisionGuide.movementReason)
  remissionGuide!: RemissionGuide[];

}
