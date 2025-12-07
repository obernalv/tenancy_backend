import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Role } from "./Role.entity.js";
import { Tenant } from "./Tenant.entity.js";


@Entity({ name: "users" })
@Index(["tenant_id", "email"], { unique: true })
export class User {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: 'varchar', length: 150 })
  email!: string;

  @Column({ type: 'varchar', length: 50 })
  username!: string;

  @Column({ type: 'varchar', length: 200 })
  passwordHash!: string;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @ManyToOne(() => Role ,(role) => role.users)
  @JoinColumn({ name: "role_id" })
  role: Role;

  @Column({ type: "timestamptz", nullable: true })
  lastLogin?: Date | null;

  @ManyToOne(() => Tenant, (tenant) => tenant.users)
  @JoinColumn({name: "tenant_id"})
  tenant: Relation<Tenant>

  @Column({type: 'uuid'})
  tenant_id!: string 

}