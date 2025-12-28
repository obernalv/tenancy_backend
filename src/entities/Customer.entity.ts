import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AuditBase } from "./AuditBase.entity.js";
import { Party } from "./Party.entity.js";
import { Sale } from "./Sale.entity.js";



@Entity({ name: "customers" })
export class Customer extends AuditBase {

  @ManyToOne(() => Party, (party) => party.customers)
  @JoinColumn({ name: "party_id" })
  party!: Party;

  @Column({ name: "credit_limit", type: 'decimal', precision: 9, scale: 2, default: 0 })
  creditLimit?: number;

  @OneToMany(() => Sale, (sales) => sales.customer)
  sales!: Sale[];
}
