import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { PartyType } from "../enums/PartyType.js";
import { Carrier } from "./Carrier.entity.js";
import { Customer } from "./Customer.entity.js";
import { IdentificationType } from "./IdentificationType.entity.js";
import { Supplier } from "./Supplier.entity.js";


@Entity({ name: "parties" })
@Unique(["identificationNumber"])
export class Party {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: 'enum', enum: PartyType, default: PartyType.PERSON})
    partyType!: PartyType

    @OneToOne(() => IdentificationType)
    // @JoinColumn({ name: "identification_type_id" })
    identificationType: IdentificationType;

    @Column({ type: 'varchar', length: 13 })
    identificationNumber!: string;

    @Column({ type: 'varchar', length: 250 })
    tradeName!: string;

    @Column({ type: 'varchar', length: 250 })
    companyName!: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    address?: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    email?: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    phoneNumber?: string;

    @Column({ type: 'boolean', default: false })
    accounting_obliged!: boolean;

    @Column({ type: 'boolean', default: false })
    special_contributor!: boolean

    @Column({ type: 'varchar', length: 20, nullable: true })
    special_code?: string;

    // Relación con Carrier
    @OneToMany(() => Carrier, (carrier) => carrier.party)
    carriers: Carrier[];

    // Realcion con customer
    @OneToMany(() => Customer, (customer) => customer.party)
    customers: Customer[];

    // Relacion con supplier
    @OneToMany(() => Supplier, (supplier) => supplier.party)
    suppliers: Supplier[];

}

