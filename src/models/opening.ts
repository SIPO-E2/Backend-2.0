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
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Employee } from './employee';
import { JobPosition } from './jobPosition';

interface OpeningAttributes {
  id: number;
  status_opening: string;
  open_date: Date;
  close_date: Date;
  close_reason: string;
  hours_required: number;
  employee_id: number;
  employee: Employee;
  jobPosition: JobPosition;
  jobPosition_id: number;
  activeDB: boolean;
}

export interface OpeningCreationAttributes extends Optional<OpeningAttributes, 'id' | "activeDB" | "jobPosition" | "employee"> { }


@Table({
  tableName: "opening",
  timestamps: true,
  paranoid: true,
})
export class Opening extends Model<
  OpeningAttributes,
  OpeningCreationAttributes
> {
  @Column(DataType.STRING(128))
  public status_opening!: string;

  // Foreign key employee
  @ForeignKey(() => Employee)
  @Column(DataType.INTEGER)
  public employee_id!: number;

  // has one employee
  @BelongsTo(() => Employee)
  public employee!: Employee;

  // Foreign key JobPosition
  @ForeignKey(() => JobPosition)
  @Column(DataType.INTEGER)
  public jobPosition_id!: number;

  // has one JobPosition
  @BelongsTo(() => JobPosition)
  public jobPosition!: JobPosition;

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
}
