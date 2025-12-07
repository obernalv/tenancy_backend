import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  Relation,
} from "typeorm";
import { AuditBase } from "./AuditBase.entity.js";
import { Carrier } from "./Carrier.entity.js";
import { MovementReason } from "./MovementReason.entity.js";
import { Purchase } from "./Purchase.entity.js";
import { RemissionGuideDetail } from "./RemissionGuideDetail.entity.js";
import { Sale } from "./Sale.entity.js";
import { Warehouse } from "./WareHouse.entity.js";


@Entity({ name: "remission_guides" })
export class RemissionGuide extends AuditBase {
  @Column({ type: "date", nullable: false })
  issueDate!: Date;

  @OneToOne(() => Sale, { nullable: true })
  @JoinColumn({ name: "sale_id" })
  sale: Relation<Sale>;

  @Column({ type: "varchar", length: 17 })
  invoiceNumber?: string;

  @Column({ type: "varchar", length: 49 })
  authorizationNumber!: string;

  @OneToOne(() => Purchase, { nullable: true })
  @JoinColumn({ name: "purchase_id" })
  purchase?: Purchase;

  // carrier
  @OneToOne(() => Carrier)
  @JoinColumn({ name: "carrier_id" })
  carrier!: Carrier;

  @OneToMany(
    () => RemissionGuideDetail,
    (guideDetail) => guideDetail.remissionGuide,
    { cascade: true }
  )
  guideDetail!: RemissionGuideDetail[];

  // punto de partida
  @ManyToOne(() => Warehouse, (warehouse) => warehouse.remissionGuides)
  @JoinColumn({ name: "warehouse_id" })
  warehouse: Relation<Warehouse>;

  // punto de llegada
  @Column({type: "varchar", length: 255})
  arrivalPoint!: string;

  // motivos de traslado
  @ManyToOne(() => MovementReason)
  @JoinColumn({ name: "movement_reason_id" })
  movementReason!: MovementReason;

  // fecha de salida
  @Column({ type: "date" })
  departureDate!: Date;

  // fecha de llegada
  @Column({ type: "date" })
  arrivalDate!: Date;

  // codigoEstablecimientoDestino
  @Column({ type: "varchar", length: 3 })
  destinationEstablishmentCode?: string

  // codigoAduanero
  @Column({ type: "varchar", length: 20 })
  customsCode?: string

  // codigoSucursal
  @Column({ type: "varchar", length: 3 })
  branchCode?: string

}
