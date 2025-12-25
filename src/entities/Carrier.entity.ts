import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { AuditBase } from './AuditBase.entity.js';
import { Party } from './Party.entity.js';

@Entity({name: "carriers"})
export class Carrier extends AuditBase{

    @ManyToOne(() => Party, (party) => party.carriers)
    @JoinColumn({ name: "party_id" })
    party:Relation<Party>;

    @Column({
        type: 'varchar',
        length: 50
    })
    plateNumber!: string
    // Relacion con Guia es uno auno
}