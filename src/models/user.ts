import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Client } from "./client";
import { Project } from "./project";
import { UserRole } from "./userRole";
import { Role } from "./role";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  clients: Client[];
  projects: Project[];
  roles: Role[];
  activeDB: boolean;
}

export interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "activeDB" | "clients" | "projects" | "roles"
  > {}

@Table({
  tableName: "user",
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
  public profileImage!: string;

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

  //Has many clients
  @HasMany(() => Client)
  public clients!: Client[];

  //Has many projects
  @HasMany(() => Project)
  public projects!: Project[];

  // Belongs to many users
  @BelongsToMany(() => Role, () => UserRole)
  public roles!: Role[];
}
