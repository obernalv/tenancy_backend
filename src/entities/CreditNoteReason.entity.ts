import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'credit_note_reason'})
export class CreditNoteReason {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({type: 'varchar', length: 5, nullable: true})
    code?: string

    @Column({type: 'varchar', length: 100})
    description!: string;

    @Column({ type: 'boolean'})
    isActive!: boolean
}
