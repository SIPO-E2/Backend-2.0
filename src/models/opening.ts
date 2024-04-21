import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Employee } from "./employee";
import { EmployeeOpening } from "./employeeOpening";
import { JobPosition } from './jobPosition';
import { Status, ReasonCurrentStatus} from "./enums";

interface OpeningAttributes {
  id: number;
  status: Status;
  status_date: Date;
  reason_current_status: ReasonCurrentStatus;
  open_date: Date;
  close_date: Date;
  close_reason: string;
  hours_required: number;
  owner_jobPosition_id: number;
  owner_jobPosition: JobPosition;
  activeDB: boolean;
}

export interface OpeningCreationAttributes extends Optional<OpeningAttributes, 'id' | "activeDB" | "owner_jobPosition"| "status_date" > { }


@Table({
  tableName: "opening",
  timestamps: true,
  paranoid: true,
})
export class Opening extends Model<
  OpeningAttributes,
  OpeningCreationAttributes
> {
  @Column(DataType.ENUM(...Object.values(Status)))
  public status!: string;

  @Column(DataType.DATE)
  public status_date!: Date;

  @Column(DataType.STRING(128))
  public reason_current_status!: string;


  // Foreign key JobPosition
  @ForeignKey(() => JobPosition)
  @Column(DataType.INTEGER)
  public owner_jobPosition_id!: number;

  // has one JobPosition
  @BelongsTo(() => JobPosition)
  public owner_jobPosition!: JobPosition;

  @Column(DataType.DATE)
  public open_date!: Date;

  @Column(DataType.DATE)
  public close_date!: Date;

  @Column(DataType.STRING(128))
  public close_reason!: string;

  @Column(DataType.INTEGER)
  public hours_required!: number;


  @CreatedAt
  @Column
  public createdAt!: Date;

  @UpdatedAt
  @Column
  public updatedAt!: Date;

  @DeletedAt
  @Column
  public DeletedAt!: Date;

  // Default true
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  public activeDB!: boolean;

  // Add this inside your Opening model
  @BelongsToMany(() => Employee, () => EmployeeOpening)
  public employees!: Employee[];

}