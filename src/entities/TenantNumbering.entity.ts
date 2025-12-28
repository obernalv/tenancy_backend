import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { DocumentType } from "./DocumentType.entity.js";
import { TenantEmissionPoint } from "./TenantEmissionPoint.entity.js";
import { TenantEstablishment } from "./TenantEstablishment.entity.js";

@Entity({ name: "tenant_numbering" })
@Index(["tenantId", "documentType", "establishment", "emissionPoint"], {
  unique: true,
})
export class TenantNumbering {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "tenant_id", type: "uuid" })
  tenantId!: string;

  @ManyToOne(() => TenantEstablishment)
  @JoinColumn({ name: "establishment_id" })
  establishment: TenantEstablishment;

  @ManyToOne(() => TenantEmissionPoint)
  @JoinColumn({ name: "emission_point_id" })
  emissionPoint: TenantEmissionPoint;

  @Column({ name: "next_number", type: "integer", default: 1 })
  nextNumber!: number;

  @Column({ type: "varchar", length: 1, nullable: true })
  prefix?: string | null; // - este por default

  @Column({ type: "integer" })
  year!: number;

  // invoice, purchase, stock_entry, etc
  @ManyToOne(() => DocumentType, (dt) => dt.numbering)
  @JoinColumn({ name: "document_type_id" })
  documentType: Relation<DocumentType>;
}
