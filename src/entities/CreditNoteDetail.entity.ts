import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { CreditNote } from "./CreditNote.entity.js";
import { Item } from "./Item.entity.js";


@Entity({ name: "credit_note_details" })
export class CreditNoteDetail {

  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @ManyToOne(() => CreditNote, (cn) => cn.details, { onDelete: "CASCADE" })
  @JoinColumn({ name: "credit_note_id" })
  creditNote: Relation<CreditNote>;

  @ManyToOne(() => Item, (item) => item.creditNoteDetails)
  @JoinColumn({ name: "item_id" })
  item!: Item;

  @Column({ type: "decimal", precision: 9, scale: 4 })
  quantity!: string;

  @Column({ type: "varchar", length: 300 })
  description?: string;

  @Column({ type: "decimal", precision: 9, scale: 4 })
  unitPrice!: number;

  @Column({ type: "decimal", precision: 9, scale: 4 })
  discount!: string;

  @Column({
    type: "decimal",
    precision: 9,
    scale: 4,
  })
  tax!: string;
}

// Notas importantes (muy importante para que no te falle en producción)
// 1. reason en cabecera
// Porque el SRI exige un motivo general.
// 2. description en detalle
// Porque cada ítem debe tener una explicación.
// 3. modifiedDocumentType = "01"
// Siempre será factura → perfecto tu campo default.
// 4. Detalle con cascade: true
// Para que con una sola operación se cree cabecera + detalles + electronic document.
