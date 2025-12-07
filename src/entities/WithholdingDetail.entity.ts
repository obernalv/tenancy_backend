import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Withholding } from "./Withholding.entity.js";



@Entity({  name: "withholding_details",})
export class WithholdingDetail {
    @PrimaryGeneratedColumn("uuid")
    id!: number;
    
    @ManyToOne(() => Withholding, (withholding) => withholding.details)
    @JoinColumn({ name: "withholding_id" })
    withholding: Relation<Withholding>;


}