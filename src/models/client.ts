import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { User } from './user';
import { Project } from './project';
import { Division } from './enums';
// import { Employee } from './employee';

interface ClientAttributes {
    id: number;
    owner_user_id: number;
    owner_user: User;
    name: string;
    division: Division;
    details: string;
    high_growth: boolean;
    image: string;
    contract_pdf: string;
    projects: Project[];
    // employees: Employee[];
    activeDB: boolean;
}

export interface ClientCreationAttributes extends Optional<ClientAttributes, 'id' | "activeDB" |"details" | "owner_user" | "projects" > {}


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
  public owner_user_id!: number;

  // has one user
  @BelongsTo(() => User)
  public owner_user!: User;

  @Column(DataType.STRING)
  public division!: string;

  @Column(DataType.STRING)
  public details?: string;

  @Column(DataType.BOOLEAN)
  public high_growth!: boolean;

  @Column(DataType.STRING)
  public image!: string;

  @Column(DataType.STRING)
  public contract_pdf!: string;
  
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

}