import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Role } from "./Role.entity.js";
import { Tenant } from "./Tenant.entity.js";


@Entity({ name: "users" })
@Index(["tenant_id", "email"], { unique: true })
export class User {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({type: "varchar", length: 50})
  email!: string

  @Column({ name: "user_name", type: 'varchar', length: 50 })
  userName?: string;

  @Column({ name: "password_hash", type: 'varchar', length: 200 })
  passwordHash!: string;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive!: boolean;

  @ManyToOne(() => Role ,(role) => role.users)
  @JoinColumn({ name: "role_id" })
  role: Role;

  @Column({ name: "last_login", type: "timestamptz", nullable: true })
  lastLogin?: Date | null;

  @ManyToOne(() => Tenant, (tenant) => tenant.users, { nullable: true })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Relation<Tenant> | null;

  @Column({type: 'uuid'})
  tenant_id!: string 

}