import { DataTypes, Model, Sequelize } from 'sequelize';


export interface ClientAttributes {
    id: string;
    name: string;
    user_id: string;
    division: string;
    details: string;
    high_growth: boolean;
    image: URL;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    activeDB?: boolean;
}

export class Client extends Model {
    public id!: string;
    public name!: string;
    public user_id!: string;
    public division!: string;
    public details!: string;
    public high_growth!: boolean;
    public image!: URL;
    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt!: Date;
    public activeDB!: boolean;
}

export function initializeClient(sequelize: Sequelize): void {
    Client.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.UUID,
            allowNull: false,
        },
        user_id: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        division: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        details: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        high_growth: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
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
            allowNull: true,
        },
    }, {
        tableName: 'client',
        sequelize,
        timestamps: true,
        paranoid: true,
    });
}

export default Client;