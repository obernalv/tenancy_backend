import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WithholdingTypeDetail } from "./WithholdingTypeDetail.entity.js";

@Entity({ name: "withholding_type" })
export class WithholdingType {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 5 })
  code!: string;

  @Column({ type: "varchar", length: 100 })
  description!: string;

  @Column({ type: "boolean" })
  isActive!: boolean;

  @OneToMany(() => WithholdingTypeDetail, (detail) => detail.withholdingType)
  wdetails!: WithholdingTypeDetail[];
}
