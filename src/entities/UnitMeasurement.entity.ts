import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UnitMeasurementType } from "../enums/UnitMeasurementType.js";
import { Item } from "./Item.entity.js";

@Entity("unit_measurements")
@Index(["code"], { unique: true })
export class UnitMeasurement {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 5 })
  code!: string;

  @Column({ type: "varchar", length: 50 })
  description!: string;

  @Column({ type: "enum", enum: UnitMeasurementType })
  type!: UnitMeasurementType;

  // Si no tiene baseUnit, es base
  @Column({ name: "is_base", type: "boolean", default: false })
  isBase!: boolean;

  @Column({ type: "varchar", length: 10, nullable: true })
  symbol?: string;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive!: boolean;

  // 🔹 Unidad base (ej: G → KG)
  @ManyToOne(() => UnitMeasurement, { nullable: true })
  @JoinColumn({ name: "base_unit_id" })
  baseUnit?: UnitMeasurement | null;

  // 🔹 Factor hacia la unidad base
  @Column({
    name: "conversion_factor",
    type: "decimal",
    precision: 14,
    scale: 6,
    nullable: true,
  })
  conversionFactor?: number | null;

  @OneToMany(() => Item, (item) => item.unitMeasurement)
  items!: Item[];

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
