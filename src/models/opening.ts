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
import { JobPosition } from "./jobPosition";
// import { Employee } from './employee';

interface OpeningAttributes {
  id: number;
  status_opening: string;
  open_date: Date;
  close_date: Date;
  close_reason: string;
  hours_required: number;
  job_position_id: number;
  // employee_id: number;
  // employee: Employee;
  activeDB?: boolean;
}

export interface OpeningCreationAttributes
  extends Optional<OpeningAttributes, "id"> {}

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

  // Foreign key user
  // @ForeignKey(() => Employee)
  // @Column(DataType.INTEGER)
  // public employee_id!: number;

  // has one user
  // @BelongsTo(() => Employee)
  // public employe!: Employee;

  @ForeignKey(() => JobPosition)
  @Column({ type: DataType.INTEGER })
  public job_position_id!: number; // Asegúrate de que este nombre coincida con cómo lo tienes en tu base de datos

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
  public activeDB?: boolean;
}
