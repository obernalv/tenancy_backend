import { Column, Entity, OneToMany } from "typeorm";
import { AuditBase } from "./AuditBase.entity.js";
import { RemissionGuide } from "./RemissionGuide.entity.js";
import { Stock } from "./Stock.entity.js";
import { StockMovement } from "./StockMovement.entity.js";


@Entity({ name: "warehouse" })
export class Warehouse extends AuditBase {
  
  @Column({name: "warehouse_name", type: "varchar", length: 200 })
  warehouseName!: string;

  @Column({ name: "location", type: 'varchar', nullable: true })
  location?: string;

  @Column({ name: "is_main", type: 'boolean' })
  isMain!: boolean;

  @Column({ name: "is_active", type: 'boolean' })
  isActive!: boolean

  @OneToMany(() => Stock, stock => stock.warehouse)
  stock!: Stock[];

  @OneToMany(() => StockMovement, (stockMovement) => stockMovement.warehouse)
  movements!: []

  @OneToMany(() => RemissionGuide, (remissionGuide) => remissionGuide.warehouse)
  remissionGuides: RemissionGuide[]

}