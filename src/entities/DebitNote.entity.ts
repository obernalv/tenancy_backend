import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation
} from "typeorm";
import { AuditBase } from "./AuditBase.entity.js";
import { DebitNoteDetail } from "./DebitNoteDetail.entity.js";
import { PaymentMethod } from "./PaymentMethod.entity.js";
import { Sale } from "./Sale.entity.js";



@Entity({ name: "debit_notes" })
export class DebitNote extends AuditBase{

  // Motivo general por se modifica(Intereses por mora)
  @Column({ type: "varchar", length: 255 })
  reason!: string; 

  @Column({ type: "timestamp" })
  issueDate!: Date;

  @Column({ type: "varchar", length: 17 })
  invoiceNumber!: string;

  @Column({ type: "varchar", length: 2, default: "01" })
  modifiedDocumentType!: string;

  // Sales
  @ManyToOne(() => Sale, (sale) => sale.debitNotes)
  @JoinColumn({ name: "sale_id" })
  sale: Relation<Sale>;

  // Payment method
  @ManyToOne(() => PaymentMethod, (payment) => payment.debitNotes)
  @JoinColumn({ name: "payment_method_id" })
  paymentMethod: Relation<PaymentMethod>;

  // Electronic documents

  @OneToMany(() => DebitNoteDetail, (detail) => detail.debitNote, {
    cascade: true,
    // eager: true,
  })
  details: DebitNoteDetail[];

}

/* 
  Notas de Débito no usan motivos predefinidos.
  Según el SRI: Una Nota de Débito se usa para:

  incrementar valores de una factura,
  por intereses,
  recargos,
  gastos imprevistos,
  error en total previo,
  reajustes,
  comisiones, etc. 

  EL MOTIVO SE EXPRESA EN EL DETALLE, NO EN CABECERA.(Factura electrónica)
  <detalles>
    <detalle>
      <descripcion>Interés por mora</descripcion>
      <valorTotal>5.00</valorTotal>
    </detalle>
  </detalles>

*/