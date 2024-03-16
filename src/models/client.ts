import { Table, Column, Model, DataType, AllowNull, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { Optional } from 'sequelize';



export interface ClientAttributes {
    id: string;
    name: string;
    user_id: string;
    division: string;
    details: string;
    high_growth: boolean;
    image: string;
    activeDB: boolean;
}

export interface ClientCreationAttributes extends Optional<ClientAttributes, 'id'> {}


@Table({
  tableName: 'client',
  timestamps: true,
  paranoid: true,
})

export class Client extends Model<ClientAttributes, ClientCreationAttributes> {

  @AllowNull(false)
  @Column(DataType.STRING)
  public name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public user_id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public division!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public details!: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public high_growth!: boolean;

  @AllowNull(false)
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

  @AllowNull(true)
  @Column(DataType.BOOLEAN)
  public activeDB!: boolean;
}


// export class Client extends Model<> {
//   @PrimaryKey
//   @Default(DataType.UUIDV4)
//   @Column(DataType.UUID)
//   public id!: string;

//   @AllowNull(false)
//   @Column(DataType.UUID)
//   public name!: string;

//   @AllowNull(false)
//   @Column(DataType.STRING)
//   public user_id!: string;

//   @AllowNull(false)
//   @Column(DataType.STRING)
//   public division!: string;

//   @AllowNull(false)
//   @Column(DataType.STRING)
//   public details!: string;

//   @AllowNull(false)
//   @Column(DataType.BOOLEAN)
//   public high_growth!: boolean;

//   @AllowNull(false)
//   @Column(DataType.STRING)
//   public image!: string;

//   @CreatedAt
//   @Column(DataType.STRING)
//   public createdAt!: Date;

//   @UpdatedAt
//   @Column(DataType.DATE)
//   public updatedAt!: Date;

//   @DeletedAt
//   @Column(DataType.DATE)
//   public deletedAt!: Date;

//   @AllowNull(true)
//   @Column(DataType.BOOLEAN)
//   public activeDB!: boolean;
// }
