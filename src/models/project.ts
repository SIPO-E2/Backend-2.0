import { Table, Column, Model, DataType, AllowNull, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Client } from './client';
import { User } from './user';

interface ProjectAttributes{
    id: number;
    name: string;
    status: number;
    revenue: number;
    region: string;
    posting_date: Date;
    exp_closure_date: Date;
    image: string;
    owner: User;
    //client: Client;
    //job_positions: JobPosition[];
    activeDB?: boolean;
}

export interface ProjectCreationAttributes extends Optional<ProjectAttributes,'id'> {}

@Table({
    tableName: 'project',
    timestamps: true,
    paranoid: true,
})

export class Project extends Model<ProjectAttributes, ProjectCreationAttributes>{

    @Column(DataType.STRING)
    public name!: string;

    @Column(DataType.INTEGER)
    public status!: number;

    @Column(DataType.FLOAT)
    public revenue!: number;

    @Column(DataType.STRING)
    public region!: string;

    @Column(DataType.DATE)
    public posting_date!: Date;

    @Column(DataType.DATE)
    public exp_closure_date!: Date;

    @Column(DataType.STRING)
    public image!: string;

    //Has one Client
    //@BelongsTo(() => Client)
    //public client!: Client;

    // Foreign key user
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    public user_id!: number;

    // Foreign key client
    //@ForeignKey(() => Client)
    //@Column(DataType.INTEGER)
    //public client_id!: number;

   

}