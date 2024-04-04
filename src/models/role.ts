// role.ts
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { UserRole } from './userRole';
import { User } from './user';

interface RoleAttributes {
    id: string;
    name: string;
    users: User[];
    // createdAt: Date;
    // updatedAt: Date;
    // deletedAt: Date;
    activeDB: boolean;
}

export interface RoleCreationAttributes extends Optional<RoleAttributes, 'id' | 'activeDB'| 'users' > {}

@Table({
 tableName: 'role',
 timestamps: true,
 paranoid: true,
})
export class Role extends Model<RoleAttributes, RoleCreationAttributes> {

 @Column(DataType.STRING(128))
 public name!: string;

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

 // Belongs to many users
 @BelongsToMany(() => User, () => UserRole)
 public users!: User[];
}
