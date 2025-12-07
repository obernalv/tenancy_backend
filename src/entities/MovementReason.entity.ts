import { Column, Entity, OneToMany } from "typeorm";
import { AuditBase } from "./AuditBase.entity.js";
import { RemissionGuide } from "./RemissionGuide.entity.js";
import { StockMovement } from "./StockMovement.entity.js";



@Entity({ name: "movement_reason" })
export class MovementReason extends AuditBase{

  @Column({ type: "varchar", length: 3, unique: true })
  code!: string; // Ej: VEN, COM, DEV, TRA, SER, REC

  @Column({ type: "varchar", length: 150 })
  description!: string;

  @Column({ type: "boolean", default: true })
  isForKardex!: boolean;

  @Column({ type: "boolean", default: true })
  isForGuia!: boolean;

  @Column({ type: "boolean", default: true })
  isForInventoryAdjustment!: boolean;

  @OneToMany(() => StockMovement, (stockMovement) => stockMovement.reason)
  stockMovement!: StockMovement[];

  @OneToMany(() => RemissionGuide, (remisionGuide) => remisionGuide.movementReason)
  remissionGuide!: RemissionGuide[];

}


// info para seeder: 
  
  
// export const movementReasonSeeds = [
//   { code: "VEN", description: "Venta de bienes", isForGuia: true, isForKardex: true },
//   { code: "COM", description: "Compra de bienes", isForGuia: true, isForKardex: true },
//   { code: "DEV", description: "Devolución", isForGuia: true, isForKardex: true },
//   { code: "TRA", description: "Traslado entre establecimientos", isForGuia: true, isForKardex: true },
//   { code: "SER", description: "Prestación de servicios", isForGuia: true, isForKardex: true },
//   { code: "REC", description: "Recojo de bienes transformados", isForGuia: true, isForKardex: true },
//   { code: "AJU", description: "Ajuste de inventario", isForGuia: false, isForKardex: true },
// ];
