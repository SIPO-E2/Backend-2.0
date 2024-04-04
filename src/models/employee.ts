import { Table, Column, Model, DataType, AllowNull, BelongsToMany, CreatedAt, UpdatedAt, DeletedAt, HasMany, BelongsTo, ForeignKey, HasOne } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Opening } from './opening';
import { EmployeeOpening } from './employeeOpening';
import { EmployeeStatus } from './enums';
import { Candidate } from './candidate';
import { Bench } from './bench';
import { Billing } from './billing';


interface EmployeeAttributes {
    id: number;
    candidateId: number;
    candidateInformation: Candidate;
    status: EmployeeStatus;
    reason_current_status: string;
    status_date: Date;
    salary: number;
    job_title: string;
    job_grade:string;
    joining_date: Date;
    openings: Opening[];
    activeDB: boolean;
}

export interface EmployeeCreationAttributes extends Optional<EmployeeAttributes, 'id'| "activeDB" | "status_date" | "openings" | "candidateInformation"> {}

@Table({
  tableName: 'employee',
  timestamps: true,
  paranoid: true,
})
export class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> {

  @ForeignKey(() => Candidate)
  @Column(DataType.INTEGER)
  public candidateId!: number;

  @BelongsTo(() => Candidate)
  public candidateInformation!: Candidate;

  @Column(DataType.STRING(128))
  public name!: string;

  @Column(DataType.ENUM(...Object.values(EmployeeStatus)))
  public status!: EmployeeStatus;

  @Column(DataType.STRING(128))
  public reason_current_status!: string;

  @Column(DataType.DATE)
  public status_date!: Date;

  @Column(DataType.FLOAT)
  public salary!: number;


  @Column(DataType.STRING(128))
  public job_title!: string;

  @Column(DataType.STRING(128))
  public job_grade!: string;

  @Column(DataType.DATE)
  public joining_date!: Date;

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
  @Column({ type:DataType.BOOLEAN, defaultValue: true })
  public activeDB!: boolean;

  // Add this inside your Employee model
  @BelongsToMany(() => Opening, () => EmployeeOpening)
  public openings!: Opening[];

  // in the controller check the status to see if the candidate is a Pipeline or Employee

  @HasOne(()=> Bench)
  public benchInformation!: Bench;

  @HasOne(()=> Billing)
  public billingInformation!: Billing;


}