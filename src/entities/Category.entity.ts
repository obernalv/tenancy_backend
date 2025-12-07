import { Column, Entity, OneToMany } from 'typeorm';
import { AuditBase } from './AuditBase.entity.js';
import { Item } from './Item.entity.js';
import { Promotion } from './Promotions.entity.js';


@Entity({name: "categories"})
export class Category extends AuditBase {

    @Column({type: 'varchar', length: 100})
    description!: string

    @OneToMany(() => Item, (item) => item.category)
    items!: Item[]

    @OneToMany(() => Promotion, promotion => promotion.category)
    promotions: Promotion[];
}