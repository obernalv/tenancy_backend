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

    @Column({name: "identification_number", type: 'varchar', length: 13 })
    identificationNumber!: string;

    @Column({ name: "trade_name", type: 'varchar', length: 250 })
    tradeName!: string;

    @Column({ name: "company_name", type: 'varchar', length: 250 })
    companyName!: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    address: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    email: string;

    @Column({ name: "phone_number", type: 'varchar', length: 10, nullable: true })
    phoneNumber?: string;

    @Column({ name: "accounting_obliged", type: 'boolean', default: false })
    accountingObliged!: boolean;

    @Column({ name: "special_contributor", type: 'boolean', default: false })
    specialContributor!: boolean

    @Column({ name: "special_code", type: 'varchar', length: 20, nullable: true })
    specialCode?: string;

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

