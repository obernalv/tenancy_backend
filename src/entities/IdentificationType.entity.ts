import { Column, Entity } from 'typeorm';
import { AuditBase } from './AuditBase.entity.js';


@Entity({name: "identification_type"})

export class IdentificationType extends AuditBase{

    @Column({type: 'varchar', length: 2})
    code!: string

    @Column({type: 'varchar', length: 50})
    description!: string


}