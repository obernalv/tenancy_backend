import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Relation,
} from "typeorm";
import { ReceiptStatus } from "../enums/ReceiptStatus.entity.js";
import { AuditBase } from "./AuditBase.entity.js";
import { CreditNote } from "./CreditNote.entity.js";
import { DebitNote } from "./DebitNote.entity.js";
import { DocumentType } from "./DocumentType.entity.js";
import { PurchaseLiquidation } from "./PurchaseLiquidation.entity.js";
import { RemissionGuide } from "./RemissionGuide.entity.js";
import { Sale } from "./Sale.entity.js";
import { Withholding } from "./Withholding.entity.js";


@Entity({ name: "electronic_documents" })
export class ElectronicDocument extends AuditBase {
  @Check(
    `
      ((sale_id IS NOT NULL)::int +
      (guide_id IS NOT NULL)::int +
      (credit_note_id IS NOT NULL)::int +
      (debit_note_id IS NOT NULL)::int +
      (purchase_liquidation_id IS NOT NULL)::int +
      (withholding_id IS NOT NULL)::int) = 1
    `
  )

  @ManyToOne(() => DocumentType, (dt) => dt.documents)
  @JoinColumn({ name: "document_type_id" })
  documentType!: DocumentType;

  @Column({ type: "varchar", length: 49 })
  accessKey!: string;

  @Column({ type: "varchar", length: 49 })
  authorizationNumber!: string;

  @Column({ type: "timestamp", nullable: true })
  authorizationDate!: Date;

  @Column({ type: "text", nullable: true })
  signedXml!: string;

  @Column({ type: "text", nullable: true })
  authorizedXml!: string;

  @Column({ type: "enum", enum: ReceiptStatus, default: ReceiptStatus.SIGNED })
  status!: string;

  // Relaciones 1:1
  @OneToOne(() => Sale)
  @JoinColumn({ name: "sale_id" })
  sale?: Relation<Sale>;

  @OneToOne(() => RemissionGuide)
  @JoinColumn({ name: "guide_id" })
  guide?: Relation<RemissionGuide>;

  @OneToOne(() => CreditNote)
  @JoinColumn({ name: "credit_note_id" })
  creditNote?: Relation<CreditNote>;

  @OneToOne(() => DebitNote)
  @JoinColumn({ name: "debit_note_id" })
  debitNote?: Relation<DebitNote>;

  @OneToOne(() => PurchaseLiquidation)
  @JoinColumn({ name: "purchase_liquidation_id" })
  purchaseLiquidation?: Relation<PurchaseLiquidation>;

  @OneToOne(() => Withholding)
  @JoinColumn({ name: "withholding_id" })
  withholding?: Relation<Withholding>;
  
}