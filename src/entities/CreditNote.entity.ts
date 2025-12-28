import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, Relation } from "typeorm";

import { AuditBase } from "./AuditBase.entity.js";
import { CreditNoteDetail } from "./CreditNoteDetail.entity.js";
import { CreditNoteReason } from "./CreditNoteReason.entity.js";
import { Sale } from "./Sale.entity.js";


@Entity({ name: "credit_notes" })
export class CreditNote extends AuditBase {

  @Column({ name: "issue_date", type: "date" })
  issueDate!: Date;

  @Column({ name: "invoice_number", type: "varchar", length: 17 })
  invoiceNumber!: string;

  @Column({ name: "modified_document_type", type: "varchar", length: 2, default: "01" })
  modifiedDocumentType!: string; // Siempre factura

  // Puede tener una sola razon para generarla
  @OneToOne(() => CreditNoteReason)
  @JoinColumn({ name: "credit_note_reason_id" })
  reason?: Relation<CreditNoteReason>;

  // Sale (factura afectada)
  @ManyToOne(() => Sale, (sale) => sale.creditNotes)
  @JoinColumn({ name: "sale_id" })
  sale: Relation<Sale>;

  // Electronic document(one-to-one)

  // DETAILS
  @OneToMany(() => CreditNoteDetail, (detail) => detail.creditNote, {
    cascade: true
  })
  details: CreditNoteDetail[];
}


/* Notas de credito posee motivo normados
Deben ser expresados en la cabecera (Factura electrónica)
  DEVOLUCION    = "DEVOLUCION",
  DESCUENTO     = "DESCUENTO",
  BONIFICACION  = "BONIFICACION",
  ANULACION     = "ANULACION",
  OTROS         = "OTROS",
*/