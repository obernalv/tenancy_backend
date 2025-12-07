import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, Relation } from "typeorm";
import { AuditBase } from "./AuditBase.entity.js";
import { Supplier } from "./Supplier.entity.js";
import { Tax } from "./Taxes.entity.js";
import { WithholdingDetail } from "./WithholdingDetail.entity.js";


// Retenciones
@Entity({ name: "withholdings" })
export class Withholding extends AuditBase {
   
    // Sujeto retenido
    @ManyToOne(() => Supplier, (supplier) => supplier.withholdings)
    @JoinColumn({ name: "supplier_id" })
    supplier!: Relation<Supplier>;

    // Perido fiscal
    @Column({ type: "integer" })
    month!: number;

    @Column({ type: "integer" })
    year!: number;

    @OneToOne(() => Tax)
    @JoinColumn({ name: "tax_id" })
    tax?: Tax;

    @Column("decimal", { precision: 9, scale: 2, default: 0 })
    taxableBase!: number;

    @Column("decimal", { precision: 9, scale: 2, default: 0 })
    percentage!: number;

    @Column("decimal", { precision: 9, scale: 2, default: 0 })
    withholdingPercentage!: number;

    @OneToMany(() => WithholdingDetail, (detail) => detail.withholding)
    details: WithholdingDetail[];
}