import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity.js';


@Entity({ name: "roles" })
export class Role {
  
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({name: "role_name", type: 'varchar', length: 100 })
  roleName!: string;

  @Column({ type:'varchar', nullable: true })
  description?: string | null;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}

// TENANT,  SUPER_ADMIN, ADMIN