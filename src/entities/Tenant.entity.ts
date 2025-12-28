
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { BusinessType } from "../enums/BusinessType.js";
import { SriEnvironment } from "../enums/SriEnvironment.js";
import { Certificate } from "./Certificate.entity.js";
import { Party } from "./Party.entity.js";
import { User } from "./User.entity.js";

@Entity({ name: "tenants" })
export class Tenant {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => Party)
  @JoinColumn({ name: "party_id" })
  party: Party;

  @OneToMany(() => Certificate, (c) => c.tenant, { nullable: true })
  certificates: [];

  @Column({ name: "logo_url", type: "text", nullable: true })
  logoUrl?: string | null;

  @Column({ name: "sri_environment", type: "enum", enum: SriEnvironment, default: SriEnvironment.TESTING })
  sriEnvironment!: SriEnvironment;

  @Column({ name: "business_type", type: 'enum', enum: BusinessType })
  businessType!: BusinessType

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive!: boolean;

  // configuración por tenant (json para extender)
  @Column({ type: "jsonb", nullable: true })
  config?: Record<string, any> | null;

  @OneToMany(() => User, (u) => u.tenant)
  users: User[];
}
