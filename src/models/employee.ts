import { Table, Column, Model, DataType, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Client } from './client';

interface EmployeeAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    activeDB?: boolean;
}

export interface EmployeeCreationAttributes extends Optional<EmployeeAttributes, 'id'> {}

@Table({
  tableName: 'employee',
  timestamps: true,
  paranoid: true,
})
export class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> {

  @Column(DataType.STRING(128))
  public name!: string;

  @Column(DataType.STRING(128))
  public email!: string;

  @Column(DataType.STRING(128))
  public password!: string;

  @Column(DataType.STRING(128))
  public role!: string;

  @CreatedAt
  @Column(DataType.DATE)
  public createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  public updatedAt!: Date;

  @DeletedAt
  @Column(DataType.DATE)
  public deletedAt!: Date;

  @Column(DataType.BOOLEAN)
  public activeDB?: boolean;

  @HasMany(() => Client)
  public clients!: Client[];
}