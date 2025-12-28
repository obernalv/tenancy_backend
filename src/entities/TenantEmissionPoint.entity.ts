import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TenantEstablishment } from "./TenantEstablishment.entity.js";
import { TenantNumbering } from "./TenantNumbering.entity.js";


@Entity({ name: "tenant_emission_points" })
@Index(["establishment", "code"], { unique: true })
export class TenantEmissionPoint {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 3 })
  code!: string; // 001

  @ManyToOne(() => TenantEstablishment, (est) => est.emissionPoints)
  @JoinColumn({ name: "establishment_id" })
  establishment: TenantEstablishment;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive!: boolean;

  @OneToMany(() => TenantNumbering, (n) => n.emissionPoint)
  numbering!: TenantNumbering[];
}
