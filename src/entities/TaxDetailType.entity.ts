import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaxType } from "./TaxType.entity.js";

@Entity({name: "detail_tax_type"})
export class TaxDetailType  {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: 'varchar', length: 5})
    code!: string;

    @Column({type: 'varchar', length: 100})
    description?: string;

    @Column({type: 'decimal', precision: 9, scale: 2})
    percentage!: number;

    @ManyToOne(() => TaxType, (tax) => tax.taxDetails)
    tax: TaxType | null

}