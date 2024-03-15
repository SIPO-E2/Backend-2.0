import { DataTypes, Model, Sequelize } from 'sequelize';

export interface UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    activeDB?: boolean;
}

export class User extends Model {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt!: Date;
    public activeDB!: boolean;
}

export function initializeUser(sequelize: Sequelize): void {
    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        role: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        activeDB: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        tableName: 'user',
        sequelize,
        timestamps: true,
        paranoid: true,
    });
}
