import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UnitMeasurement } from "./UnitMeasurement.entity.js";

@Entity({ name: "tenant_unit_measurements" })
@Index(["tenantId", "unitMeasurement"], { unique: true })
export class TenantUnitMeasurement {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // COLUMNA EXPLÍCITA
  @Column({ name: "tenant_id", type: "uuid" })
  tenantId!: string;

  @ManyToOne(() => UnitMeasurement, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "unit_measurement_id" })
  unitMeasurement!: UnitMeasurement;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: "assigned_at" })
  assignedAt!: Date;
}
