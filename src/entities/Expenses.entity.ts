import { Column, Entity } from "typeorm";
import { AuditBase } from "./AuditBase.entity.js";


@Entity({ name: "expenses" })
export class Expense extends AuditBase {

    @Column({type: 'date', nullable: false})
    expenseDate!: Date;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
    })
    description!: string;

    @Column({
        type: "decimal",
        precision: 9,
        scale: 4,
    })
    amount!: number;

    @Column({ type: 'enum', enum: ['TRAVEL', 'SUPPLIES', 'UTILITIES', 'OTHER'], nullable: false })
    category!: 'TRAVEL' | 'SUPPLIES' | 'UTILITIES' | 'OTHER';
}