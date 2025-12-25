import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaxDetailType } from "./TaxDetailType.entity.js";

@Entity({ name: "type_taxes" })
export class TaxType {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 5 })
  code!: string;

  @Column({ type: "varchar", length: 100 })
  description!: string;

  @Column({ type: "boolean"})
  isActive!: boolean

  @OneToMany(() => TaxDetailType, (detail) => detail.tax)
  taxDetails!: TaxDetailType[];
}
