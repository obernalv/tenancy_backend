import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { CertificateP12State } from "../enums/CertificateP12State.js";
import { AuditBase } from "./AuditBase.entity.js";
import { Tenant } from "./Tenant.entity.js";

@Entity({ name: "certificate" })
export class Certificate extends AuditBase {
  @Column({ name: "file_name", type: "text"  })
  fileName?: string;

  @Column({ name: "file_key", type: "text"  })
  fileKey!: string;

  @Column({ name: "file_path", type: "text" })
  filePath!: string;

  // Guarda el .p12 cifrado (recomiendo usar blob/binary)
  @Column({ name: "encrypted_p12", type: "bytea", nullable: true })
  encryptedP12?: Buffer | null;

  // impresión del pulgar
  @Column({ name: "thumb_print", type: "text",  nullable: true })
  thumbPrint?: string | null;

  // Valido desde
  @Column({ name: "valid_from",type: "date",  nullable: false })
  validFrom?: Date | null;

  // Valido hasta
  @Column({ name: "valid_to", type: "date", nullable: false })
  validTo?: Date | null;

  @Column({
    type: "enum",
    enum: CertificateP12State,
    default: CertificateP12State.ACTIVE,
  })
  status!: CertificateP12State;

  @ManyToOne(() => Tenant, (t) => t.certificates)
  @JoinColumn({ name: "tenant_id" })
  tenant!: Relation<Tenant>;
}
