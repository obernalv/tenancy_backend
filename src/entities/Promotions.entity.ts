
import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { AuditBase } from './AuditBase.entity.js';
import { Category } from './Category.entity.js';


@Entity({ name: 'promotions' })
export class Promotion extends AuditBase{

    // ID es heredado de AuditBase

    // Título breve de la promoción
    @Column({ type: 'varchar', length: 150  })
    title: string;

    // Descripción detallada de la promoción
    @Column({ type: 'text', nullable: true })
    description?: string;

    // Define si el descuento es un porcentaje o una cantidad fija.
    @Column({ type: 'enum', enum: ['percentage', 'fixed_amount'] })
    discountType: 'percentage' | 'fixed_amount';

    // El valor del descuento. Si discountType es 'percentage', será un número entre 0 y 100. Si es 'fixed_amount', será la cantidad monetaria a descontar.
    @Column({ type: 'decimal', precision: 9, scale: 4 })
    discountValue: number;

    // Fecha y hora de inicio de la promoción.
    @Column({ type: 'date' })
    startDate: Date;

    // Fecha y hora de finalización de la promoción.
    @Column({ type: 'date' })
    endDate: Date;

    // Un flag para activar/desactivar la promoción manualmente, incluso si está dentro de su rango de fechas.
    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    // Si la promoción requiere un código promocional (ej. "SUMMER20").
    @Column({ type: 'varchar', length: '10', unique: true, nullable: true })
    code?: string;

    // Cantidad mínima de compra requerida para aplicar la promoción.
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    minimumPurchaseAmount: number;

    // Número máximo de veces que se puede aplicar esta promoción en total. 
    @Column({ type: 'integer', nullable: true })
    usageLimit?: number;

    // Número máximo de veces que un mismo usuario puede aplicar esta promoción.
    @Column({ type: 'integer', nullable: true })
    perUserLimit?: number;

    @ManyToOne(() => Category, category => category.promotions, { nullable: true })
    @JoinColumn({ name: 'categoryId' })
    category: Relation<Category>;

    // @Column({ type: 'text', nullable: true })
    // categoryId: number; 

}