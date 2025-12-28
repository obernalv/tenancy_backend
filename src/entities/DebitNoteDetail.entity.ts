import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { DebitNote } from "./DebitNote.entity.js";
import { Item } from "./Item.entity.js";


@Entity({ name: "debit_note_detail" })
export class DebitNoteDetail {
   @PrimaryGeneratedColumn("uuid")
  id!: number;
  // Motivos especificos: "Interés por mora acumulado del 5 al 20 de enero"
  @Column({type: 'varchar', length: 100})
  descripcion!: string;


  @Column({
    type: "decimal",
    precision: 9,
    scale: 4,
    nullable: false,
  })
  quantity!: number;

  @Column({
    name: "unit_price",
    type: "decimal",
  })
  unitPrice!: number;

  @Column({
    type: "decimal",
    precision: 9,
    scale: 4,
  })
  discount!: number;

  @Column({
    type: "decimal",
    precision: 9,
    scale: 4,
  })
  tax!: number;

  @ManyToOne(() => DebitNote, (debitNote) => debitNote.details, { onDelete: "CASCADE" })
  @JoinColumn({ name: "debit_note_id" })
  debitNote: Relation<DebitNote>;

  @ManyToOne(() => Item, (item) => item.debitNoteDetail)
  @JoinColumn({ name: "item_id" })
  item: Relation<Item>;
}
