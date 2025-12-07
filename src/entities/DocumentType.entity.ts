import { Column, Entity, OneToMany } from "typeorm";
import { AuditBase } from "./AuditBase.entity.js";
import { ElectronicDocument } from "./ElectronicDocument.entity.js";
import { Sequence } from "./Sequence.entity.js";


@Entity({ name: "document_types" })
export class DocumentType extends AuditBase{


  @Column({ type: "varchar", length: 2 })
  code!: string;

  @Column({ type: "varchar",length: 100 })
  documentName!: string;

  // Indica si el tipo de documento aplica para retenciones
  @Column({ type: "boolean", default: false })
  withholdingApply!: boolean;

  @OneToMany(() => Sequence, (sec) => sec.documentType)
  sequence!: Sequence[];

  @OneToMany(() => ElectronicDocument, (doc) => doc.documentType)
  documents!: ElectronicDocument[];

}
