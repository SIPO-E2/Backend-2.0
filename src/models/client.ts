// ....

import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { User } from "./user";
import { Project } from "./project";
import { Division } from "./enums";
// import { Employee } from './employee';

interface ClientAttributes {
  id: number;
  owner_user_id: number;
  owner_user: User;
  name: string;
  division: Division;
  high_growth: boolean;
  projects: Project[];
  // employees: Employee[];
  activeDB: boolean;
  joiningDate: Date;
  experience: string;
  money: number; // Luego se cambia a salary
  imageURL: string;
  contractFile: File | null;
  additionalDetails: string;
}

export interface ClientCreationAttributes
  extends Optional<
    ClientAttributes,
    "id" | "activeDB" | "additionalDetails" | "owner_user" | "projects"
  > {}

@Table({
  tableName: "client",
  timestamps: true,
  paranoid: true,
})
export class Client extends Model<ClientAttributes, ClientCreationAttributes> {
  @Column(DataType.STRING)
  public name!: string;

  // Foreign key user
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public owner_user_id!: number;

  // has one user
  @BelongsTo(() => User)
  public owner_user!: User;

  @Column({
    type: DataType.ENUM(...Object.values(Division)),
    allowNull: false,
  })
  division!: Division;

  @Column(DataType.STRING)
  public additionalDetails?: string;

  @Column(DataType.BOOLEAN)
  public high_growth!: boolean;

  @Column(DataType.STRING)
  public imageURL!: string;

  @Column(DataType.STRING)
  public contractFile!: string;

  @Column(DataType.DATE)
  public joiningDate!: Date;

  @Column(DataType.STRING)
  public experience!: string;

  @Column(DataType.STRING)
  public money!: string;

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

  //Has many projects
  @HasMany(() => Project)
  public projects!: Project[];
}
