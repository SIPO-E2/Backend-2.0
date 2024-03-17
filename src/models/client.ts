import { Table, Column, Model, DataType, AllowNull, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { User } from './user';



interface ClientAttributes {
    id: number;
    name: string;
    user_id: number;
    user: User;
    division: string;
    details?: string;
    high_growth: boolean;
    image: string;
    activeDB?: boolean;
}

export interface ClientCreationAttributes extends Optional<ClientAttributes, 'id'> {}


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
  @Column(DataType.STRING)
  public createdAt!: Date;

  @UpdatedAt
  @Column
  public updatedAt!: Date;

  @DeletedAt
  @Column(DataType.DATE)
  public DeletedAt!: Date;

  @Column(DataType.BOOLEAN)
  public activeDB?: boolean;
}
