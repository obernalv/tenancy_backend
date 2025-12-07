import {
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Relation
} from "typeorm";
import { AuditBase } from "./AuditBase.entity.js";
import { Item } from "./Item.entity.js";
import { Party } from "./Party.entity.js";
import { PurchaseLiquidation } from "./PurchaseLiquidation.entity.js";
import { Withholding } from "./Withholding.entity.js";


@Entity({ name: "suppliers" })
export class Supplier extends AuditBase {
  @ManyToOne(() => Party, (party) => party.suppliers)
  @JoinColumn({ name: "party_id" })
  party: Relation<Party>;

  @ManyToMany(() => Item, (item) => item)
  items!: Item[];

  // Retenciones
  @OneToMany(() => Withholding, (withholding) => withholding.supplier)
  withholdings!: Withholding[];

  // Liquidaciones de compra
  @OneToMany(() => PurchaseLiquidation,
    (purchaseLiquidation) => purchaseLiquidation.supplier
  )
  purchaseLiquidations!: PurchaseLiquidation[];
}
