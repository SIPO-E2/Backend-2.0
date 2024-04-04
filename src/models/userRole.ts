// userRole.ts
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { User } from './user';
import { Role } from './role';

interface UserRoleAttributes {
    id: number;
    userId: number;
    roleId: number;
    // createdAt: Date;
    // updatedAt: Date;
    // deletedAt: Date;
    activeDB: boolean;
}

export interface UserRoleCreationAttributes extends Optional<UserRoleAttributes, 'id' | 'activeDB' > {}

@Table({
 tableName: 'userRole',
 timestamps: true,
 paranoid: true,
})
export class UserRole extends Model<UserRoleAttributes, UserRoleCreationAttributes> {

 @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
 id!: number;

 @ForeignKey(() => User)
 @Column(DataType.STRING(128))
 public userId!: string;

 @ForeignKey(() => Role)
 @Column(DataType.STRING(128))
 public roleId!: string;

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

 @BelongsTo(() => User)
 public user!: User;

 @BelongsTo(() => Role)
 public role!: Role;
}
