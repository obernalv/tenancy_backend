import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tax } from "./Taxes.entity.js";


@Entity({name: "taxes"})
export class TaxDetail  {

    @PrimaryGeneratedColumn("uuid")
    id!: number;

    @Column({type: 'varchar', length: 5})
    code!: string

    @Column({type: 'varchar', length: 100})
    description!: string

    @Column({type: 'decimal', precision: 9, scale: 2})
    amount!: number

    @ManyToOne(() => Tax, (tax) => tax.taxDetails)
    tax!: Tax | null
}