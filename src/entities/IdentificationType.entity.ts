import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({name: "identification_type"})
export class IdentificationType{
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: 'varchar', length: 2})
    code!: string

    @Column({type: 'varchar', length: 50})
    description!: string


}