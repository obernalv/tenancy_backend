import {
  Column,
  Entity,
  OneToMany
} from "typeorm";
import { AuditBase } from "./AuditBase.entity.js";
import { Item } from "./Item.entity.js";

@Entity("unit_measurements")
export class UnitMeasurement extends AuditBase{

  @Column({
    type: "varchar",
    length: 50,
  })
  description!: string;

  @OneToMany(() => Item, (item) => item.unitMeasurement)
  items: Item[];

}
