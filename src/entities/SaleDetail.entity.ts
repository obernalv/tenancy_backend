import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Item } from "./Item.entity.js";
import { Sale } from "./Sale.entity.js";


@Entity({name: "sale_detail"})
export class SaleDetail {

    @PrimaryGeneratedColumn("uuid")
    id!: number;

    @ManyToOne(() => Sale, sale => sale.saleDetail)
    @JoinColumn({name: "sale_id"})
    sale: Relation<Sale>;

    @ManyToOne(() => Item, item => item)
    @JoinColumn({name: "ite_id"})
    item: Relation<Item>

    @Column({
        type: "decimal",
        precision: 9,
        scale: 4,
        nullable: false,
    })
    quantity!: number

    @Column({
        type: "decimal",
        precision: 9,
        scale: 4
    })
    unitPrice!: number

    @Column({
        type: "decimal",
        precision: 9,
        scale: 4
    })
    discount!: number

    @Column({
        type: "decimal",
        precision: 9,
        scale: 4
    })
    tax!: number


}