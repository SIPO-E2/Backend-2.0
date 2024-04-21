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
  HasMany,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Client } from "./client";
import { User } from "./user";
import { JobPosition } from "./jobPosition";
import { Status, Region, ReasonCurrentStatus} from "./enums";


interface ProjectAttributes{
    id: number;
    owner_user_id: number;
    owner_user: User;
    owner_client_id: number;
    owner_client: Client;
    name: string;
    status: Status;
    reason_current_status: ReasonCurrentStatus;
    status_date: Date;
    progress: number;
    revenue: number;
    region: Region;
    posting_date: Date;
    exp_closure_date: Date;
    image: string;
    job_positions_list: JobPosition[];
    activeDB: boolean;
}
// Optional id, revenue and activeDB
export interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id' |'progress'| 'status_date' | 'revenue' | 'activeDB' | "owner_user" | "owner_client" | "job_positions_list"> {}

@Table({
  tableName: "project",
  timestamps: true,
  paranoid: true,
})
export class Project extends Model<
  ProjectAttributes,
  ProjectCreationAttributes
> {
  @Column(DataType.STRING)
  public name!: string;

  @Column(DataType.ENUM(...Object.values(Status)))
  public status!: Region;

  @Column(DataType.STRING)
  public reason_current_status!: string;

  @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
  public progress!: number;

  @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
  public revenue!: number;

  @Column(DataType.ENUM(...Object.values(Region)))
  public region!: Region;

  @Column(DataType.DATE)
  public posting_date!: Date;

  @Column(DataType.DATE)
  public exp_closure_date!: Date;

  @Column(DataType.STRING)
  public image!: string;

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

  // Foreign key user
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public owner_user_id!: number;

  //Has one User
  @BelongsTo(() => User)
  public owner_user!: User;

  // Foreign key client
  @ForeignKey(() => Client)
  @Column(DataType.INTEGER)
  public owner_client_id!: number;

  //Has one Client
  @BelongsTo(() => Client)
  public owner_client!: Client;

  //Has many job_positions
  @HasMany(() => JobPosition)
  public job_positions_list!: JobPosition[];
    
}