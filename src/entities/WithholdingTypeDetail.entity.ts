import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { WithholdingType } from "./WithholdingType.entity.js";

@Entity({ name: "withholding_type_detail" })
export class WithholdingTypeDetail {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 5 })
  code!: string;

  @Column({ type: "varchar", length: 20 })
  description?: string;

  @Column({ type: "decimal", precision: 9, scale: 2 })
  percentage!: number;

  @ManyToOne(() => WithholdingType, (w) => w.wdetails)
  withholdingType: Relation<WithholdingType> | null;
}
