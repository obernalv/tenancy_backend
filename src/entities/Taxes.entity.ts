
import { Column, Entity, OneToMany } from 'typeorm';
import { AuditBase } from './AuditBase.entity.js';
import { TaxDetail } from './TaxesDetail.entity.js';


@Entity({name: "taxes"})
export class Tax extends AuditBase {

    @Column({type: 'varchar', length: 5})
    code!: string

    @Column({type: 'varchar', length: 100})
    description!: string

    @Column({type: 'decimal', precision: 9, scale: 2})
    amount!: number

    @Column({type: 'boolean', default: false})
    isRetencion!: boolean

    @OneToMany(() => TaxDetail, (detail) => detail.tax)
    taxDetails!: TaxDetail[];
}