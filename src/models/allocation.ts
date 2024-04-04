// allocation.ts
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { AllocationStatus } from './enums'; // Assuming you have an enum for AllocationStatus
import { Optional } from 'sequelize';
import { Candidate } from './candidate';
import { JobPosition } from './jobPosition';
import { Client } from './client';
import { Interview } from './interview';

interface AllocationAttributes {
    id: number;
    status: AllocationStatus;
    reason_current_status: string;
    status_date: Date;
    candidateId: number;
    candidate: Candidate;
    jobPositionId: number;
    jobPosition: JobPosition;
    client_id: number;
    client: Client;
    interviews: Interview[];
    details: string;
    activeDB: boolean;
}

export interface AllocationCreationAttributes extends Optional<AllocationAttributes, 'id' | 'activeDB' | "candidate" | "client" | "jobPosition" | "interviews" | "status_date"> {}

@Table({
 tableName: 'allocation',
 timestamps: true,
 paranoid: true,
})
export class Allocation extends Model<AllocationAttributes, AllocationCreationAttributes> {

 @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
 id!: number;

 @Column(DataType.ENUM(...Object.values(AllocationStatus)))
 public status!: AllocationStatus;

 @Column(DataType.STRING(128))
 public reason_current_status!: string;

 @Column(DataType.DATE)
 public status_date!: Date;

 @ForeignKey(() => Candidate)
 @Column(DataType.INTEGER)
 public candidateId!: number;

 @BelongsTo(() => Candidate)
 public candidate!: Candidate;

 @ForeignKey(() => JobPosition)
 @Column(DataType.INTEGER)
 public jobPositionId!: number;

 @BelongsTo(() => JobPosition)
 public jobPosition!: JobPosition;

 @ForeignKey(() => Client)
 @Column(DataType.INTEGER)
 public client_id!: number;

 @BelongsTo(() => Client)
 public client!: Client;

 @HasMany(() => Interview)
 public interviews!: Interview[];

 @Column(DataType.STRING(128))
 public details!: string;

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
}
