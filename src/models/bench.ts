// bench.ts
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Employee } from './employee';
import { Optional } from 'sequelize';

interface BenchAttributes {
    id: number;
    employeeId: number;
    employeeInformation: Employee;
    benchSince: Date;
    billingStartDate: Date;
    activeDB: boolean;
}

export interface BenchCreationAttributes extends Optional<BenchAttributes, 'id' | 'activeDB' | "employeeInformation"> {}

@Table({
 tableName: 'bench',
 timestamps: true,
 paranoid: true,
})
export class Bench extends Model<BenchAttributes, BenchCreationAttributes> {

 @ForeignKey(() => Employee)
 @Column(DataType.INTEGER)
 public employeeId!: number;

 @BelongsTo(() => Employee)
 public employeeInformation!: Employee;

 @Column(DataType.DATE)
 public benchSince!: Date;

 @Column(DataType.DATE)
 public billingStartDate!: Date;

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
