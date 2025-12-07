import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Item } from "./Item.entity.js";
import { RemissionGuide } from "./RemissionGuide.entity.js";




@Entity({name: "remission_guide_detail"})
export class RemissionGuideDetail {

    @PrimaryGeneratedColumn("uuid")
    id!: number;

    @ManyToOne(()=> RemissionGuide, (remissionGuide) => remissionGuide.guideDetail)
    @JoinColumn({name: "remission_guide_id"})
    remissionGuide: Relation<RemissionGuide>

    @ManyToOne(() => Item, (item) => item.remissionGuideDetail)
    @JoinColumn({name: "item_id"})
    item: Relation<Item>


    @Column({type: "numeric", default: 0})
    quantity!: number

    @Column({type: "numeric", default: 0})
    weight?: number



}