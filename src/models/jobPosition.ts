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
import { Opening } from "./opening";
import { Project } from "./project";
import { DemandCuration, Division, Exclusivity, PostingType, Region, Status, ReasonCurrentStatus} from "./enums";

// Asumiendo que Exclusivity y DemandCuration son enums o tipos definidos anteriormente


interface JobPositionAttributes {
  id: number;
  owner_project_id: number; 
  owner_project: Project; 
  name: string;
  status: Status;
  reason_current_status: ReasonCurrentStatus;
  status_date: Date;
  progress: number;
  bill_rate: number;
  division: Division;
  region: Region;
  cross_division: boolean;
  image: string;
  skills_position: string[];
  demand_curation: DemandCuration;
  posting_type: PostingType;
  exclusivity: Exclusivity;
  // TODO: ADD ALLOCATIONS
  openings_list: Opening[];
  // So we can use soft delete
  activeDB: boolean;
}

export interface JobPositionCreationAttributes
  extends Optional<JobPositionAttributes, "id" | "owner_project"| "status_date"| "progress"| "demand_curation" | "activeDB" | "openings_list" > {}

@Table({
  tableName: "job_position",
  timestamps: true,
  paranoid: true,
})
export class JobPosition extends Model<
  JobPositionAttributes,
  JobPositionCreationAttributes
> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  status!: Status;

  @Column({ type: DataType.STRING, allowNull: false })
  reason_current_status!: string;

  @Column({ type: DataType.DATE, allowNull: true })
  status_date!: Date;

  @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
  progress!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  bill_rate!: number;
  
  @Column({ type: DataType.STRING, allowNull: false })
  division!: Division;

  @Column({ type: DataType.STRING, allowNull: false })
  region!: Region;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  cross_division!: boolean;


  @Column({ type: DataType.STRING, allowNull: false })
  image!: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  skills_position!: string[];

  @Column({
    type: DataType.ENUM(...Object.values(DemandCuration)),
    allowNull: false,
  })
  demand_curation!: DemandCuration;

  @Column({ type: DataType.STRING, allowNull: false })
  posting_type!: string;


  @Column({
    type: DataType.ENUM(...Object.values(Exclusivity)),
    allowNull: false,
  })
  exclusivity!: Exclusivity;

  @HasMany(() => Opening)
  openings_list!: Opening[];

  // Foreign key project
  @ForeignKey(() => Project)
  @Column(DataType.INTEGER)
  owner_project_id!: number;

  // has one project
  @BelongsTo(() => Project)
  owner_project!: Project;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @DeletedAt
  @Column
  deletedAt?: Date;

  // Para el manejo de borrado suave
  @Column({ type: DataType.BOOLEAN, defaultValue: true})
  activeDB!: boolean;
}