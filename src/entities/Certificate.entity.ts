import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { CertificateP12State } from '../enums/CertificateP12State.js';
import { AuditBase } from './AuditBase.entity.js';
import { Tenant } from './Tenant.entity.js';


@Entity({ name: "certificate" })
export class Certificate extends AuditBase{
  
  @Column({ type: "text" })
  fileName?: string;

  @Column({ type: "text" })
  fileKey!: string;

  @Column({type: "text"})
  filePath!: string;

  // Guarda el .p12 cifrado (recomiendo usar blob/binary)
  @Column({ type: "bytea", nullable: true })
  encryptedP12?: Buffer | null;

  // impresión del pulgar
  @Column({ type: "text", nullable: true })
  thumbprint?: string | null;

  // Valido desde
  @Column({ type: "date", nullable: false })
  validFrom?: Date | null;

  // Valido hasta
  @Column({ type: "date", nullable: false })
  validTo?: Date | null;

  @Column({
    type: "enum",
    enum: CertificateP12State,
    default: CertificateP12State.ACTIVE
  })
  status!: CertificateP12State


  @ManyToOne(() => Tenant, (t) => t.certificates)
  @JoinColumn({name: "tenant_id"})
  tenant!: Relation<Tenant> ;

}
