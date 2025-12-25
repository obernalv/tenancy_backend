import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmissionPoint } from "./TenantEmissionPoint.entity.js";


@Entity({ name: "tenant_establishments" })
@Index(["tenantId", "code"], { unique: true })
export class TenantEstablishment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "tenant_id", type: "uuid" })
  tenantId!: string;

  // Código SRI: 001, 002, ...
  @Column({ type: "varchar", length: 3 })
  code!: string;

  @Column({ type: "varchar", length: 150 })
  name!: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @OneToMany(() => EmissionPoint, (ep) => ep.establishment)
  emissionPoints!: EmissionPoint[];
}
