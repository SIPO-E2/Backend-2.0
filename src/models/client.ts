import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { User } from './user';
import { Project } from './project';
import { Employee } from './employee';

interface ClientAttributes {
    id: number;
    name: string;
    user_id: number;
    user: User;
    division: string;
    details: string;
    high_growth: boolean;
    projects: Project[];
    employees: Employee[];
    image: string;
    activeDB: boolean;
}

export interface ClientCreationAttributes extends Optional<ClientAttributes, 'id' | "activeDB" |"details" | "user" | "projects" | "employees" > {}


@Table({
  tableName: 'client',
  timestamps: true,
  paranoid: true,
})

export class Client extends Model<ClientAttributes, ClientCreationAttributes> {

  @Column(DataType.STRING)
  public name!: string;

  // Foreign key user
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public user_id!: number;

  // has one user
  @BelongsTo(() => User)
  public user!: User;

  @Column(DataType.STRING)
  public division!: string;

  @Column(DataType.STRING)
  public details?: string;

  @Column(DataType.BOOLEAN)
  public high_growth!: boolean;

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

  //Has many projects
  @HasMany(() => Project)
  public projects!: Project[];

  //Has many employees
  @HasMany(() => Employee)
  public employees!: Employee[];
}
