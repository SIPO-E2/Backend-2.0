import { Table, Column, Model, DataType, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Client } from './client';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    activeDB?: boolean;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({
  tableName: 'user',
  timestamps: true,
  paranoid: true,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {

  @Column(DataType.STRING(128))
  public name!: string;

  @Column(DataType.STRING(128))
  public email!: string;

  @Column(DataType.STRING(128))
  public password!: string;

  @Column(DataType.STRING(128))
  public role!: string;

  @CreatedAt
  @Column(DataType.DATE)
  public createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  public updatedAt!: Date;

  @DeletedAt
  @Column(DataType.DATE)
  public deletedAt!: Date;

  // Default true
  @Column({ type:DataType.BOOLEAN, defaultValue: true })
  public activeDB?: boolean;

  @HasMany(() => Client)
  public clients!: Client[];
}

