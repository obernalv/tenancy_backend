import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Relation } from "typeorm";
import { CreditNoteReason } from "../enums/CreditNoteReason.js";
import { AuditBase } from "./AuditBase.entity.js";
import { CreditNoteDetail } from "./CreditNoteDetail.entity.js";
import { Sale } from "./Sale.entity.js";


@Entity({ name: "credit_notes" })
export class CreditNote extends AuditBase {

  @Column({ type: "date" })
  issueDate!: Date;

  @Column({ type: "varchar", length: 17 })
  invoiceNumber!: string;

  @Column({ type: "varchar", length: 2, default: "01" })
  modifiedDocumentType!: string; // Siempre factura

  @Column({
    type: "enum",
    enum: CreditNoteReason,
    nullable: false,
  })
  reason: Relation<CreditNoteReason>;

  // Sale (factura afectada)
  @ManyToOne(() => Sale, (sale) => sale.creditNotes)
  @JoinColumn({ name: "sale_id" })
  sale: Relation<Sale>;

  // Electronic document

  // DETAILS
  @OneToMany(() => CreditNoteDetail, (detail) => detail.creditNote, {
    cascade: true
  })
  details: CreditNoteDetail[];
}

