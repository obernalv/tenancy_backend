
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
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

  @ManyToOne(() => Certificate, (c) => c.tenants, { nullable: true })
  @JoinColumn({ name: "certificate_id" })
  certificate: Certificate | null;

  @Column({ type: "text", nullable: true })
  logoUrl?: string | null;

  @Column({ type: "enum", enum: SriEnvironment, default: SriEnvironment.TESTING })
  sriEnvironment!: SriEnvironment;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  // configuración por tenant (json para extender)
  @Column({ type: "jsonb", nullable: true })
  config?: Record<string, any> | null;

  @OneToMany(() => User, (u) => u.tenant)
  users: User[];
}
