import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TaxType } from "./TaxType.entity.js";


@Entity("tenant_taxes")
@Index(["tenantId", "tax"], { unique: true })
export class TenantTax {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // CLAVE MULTI-TENANT
  @Column({ name: "tenant_id", type: "uuid" })
  tenantId!: string;

  @ManyToOne(() => TaxType, { eager: true })
  @JoinColumn({ name: "tax_id" })
  tax!: TaxType;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
