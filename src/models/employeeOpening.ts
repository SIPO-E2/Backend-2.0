// employeeOpening.ts
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Employee } from './employee';
import { Opening } from './opening';

interface EmployeeOpeningAttributes {
    id: number;
    employeeId: number;
    openingId: number;
    activeDB: boolean;
}

export interface EmployeeOpeningCreationAttributes extends Optional<EmployeeOpeningAttributes, 'id' | 'activeDB'> {}

@Table({
 tableName: 'employeeOpening',
 timestamps: true,
 paranoid: true,
})
export class EmployeeOpening extends Model<EmployeeOpeningAttributes, EmployeeOpeningCreationAttributes> {

 @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
 id!: number;

 @ForeignKey(() => Employee)
 @Column(DataType.INTEGER)
 public employeeId!: number;

 @ForeignKey(() => Opening)
 @Column(DataType.INTEGER)
 public openingId!: number;

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

 @BelongsTo(() => Employee)
 public employee!: Employee;

 @BelongsTo(() => Opening)
 public opening!: Opening;
}
