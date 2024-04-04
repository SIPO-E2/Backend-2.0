// billing.ts
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Employee } from './employee';
import { Optional } from 'sequelize';

interface BillingAttributes {
    id: number;
    employeeId: number;
    employeeInformation: Employee;
    billingSince: Date;
    workHours: number;
    activeDB: boolean;
}

export interface BillingCreationAttributes extends Optional<BillingAttributes, 'id' | 'activeDB' | "employeeInformation"> {}

@Table({
 tableName: 'billing',
 timestamps: true,
 paranoid: true,
})
export class Billing extends Model<BillingAttributes, BillingCreationAttributes> {

 @ForeignKey(() => Employee)
 @Column(DataType.INTEGER)
 public employeeId!: number;

 @BelongsTo(() => Employee)
 public employeeInformation!: Employee;

 @Column(DataType.DATE)
 public billingSince!: Date;

 @Column(DataType.INTEGER)
 public workHours!: number;

 @CreatedAt
 @Column
 public createdAt!: Date;

 @UpdatedAt
 @Column
 public updatedAt!: Date;

 @DeletedAt
 @Column
 public deletedAt!: Date;

 // Default true
 @Column({ type: DataType.BOOLEAN, defaultValue: true })
 public activeDB!: boolean;
}
