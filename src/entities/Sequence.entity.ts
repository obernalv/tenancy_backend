import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { AuditBase } from "./AuditBase.entity.js";
import { DocumentType } from "./DocumentType.entity.js";


@Entity({ name: "sequence" })
// @Index(["tenant_id", "document_type_id", "establishment", "emission_point"], { unique: true })
// @Index(["document_type_id"], { unique: true })
export class Sequence extends AuditBase {


  @Column({ type: 'varchar', length: 3 })
  establishment!: string; // 001

  @Column({ type: 'varchar', length: 3 })
  emissionPoint!: string; // 001

  @Column({ type: "integer", default: 1 })
  nextNumber!: number;

  @Column({ type: "varchar", length: 1, nullable: false })
  prefix?: string | null; // - optional

  @ManyToOne(() => DocumentType, (dt) => dt.sequence)
  @JoinColumn({ name: "document_type_id" })
  documentType: Relation<DocumentType>;

}