import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ElectronicDocument } from "./ElectronicDocument.entity.js";
import { TenantNumbering } from "./TenantNumbering.entity.js";

@Entity({ name: "document_types" })
export class DocumentType {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 2 })
  code!: string;

  @Column({ type: "varchar",length: 100 })
  documentName!: string;

  // Indica si el tipo de documento aplica para retenciones
  @Column({ type: "boolean", default: false })
  withholdingApply!: boolean;

  @OneToMany(() => TenantNumbering, (sec) => sec.documentType)
  numbering!: TenantNumbering[];

  @OneToMany(() => ElectronicDocument, (doc) => doc.documentType)
  documents!: ElectronicDocument[];

}
