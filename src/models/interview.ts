// interview.ts
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { InterviewStatus } from './enums'; // Assuming you have an enum for InterviewStatus
import { Optional } from 'sequelize';
import { Allocation } from './allocation';

interface InterviewAttributes {
    id: string;
    status: InterviewStatus;
    reason_current_status: string;
    status_date: Date;
    allocation_id: number;
    allocation: Allocation;
    interview_date: Date;
    activeDB: boolean;
}

export interface InterviewCreationAttributes extends Optional<InterviewAttributes, 'id' | 'activeDB' | "allocation" | "status_date" | "interview_date" | "allocation_id" | "status" | "reason_current_status"> {}

@Table({
 tableName: 'interview',
 timestamps: true,
 paranoid: true,
})
export class Interview extends Model<InterviewAttributes, InterviewCreationAttributes> {

 @ForeignKey(() => Allocation)
 @Column(DataType.INTEGER)
 public allocation_id!: number;

 @BelongsTo(() => Allocation)
 public allocation!: Allocation;

 @Column(DataType.DATE)
 public interview_date!: Date;

 @Column(DataType.ENUM(...Object.values(InterviewStatus)))
 public status!: InterviewStatus;

 @Column(DataType.STRING(128))
 public reason_current_status!: string;

 @Column(DataType.DATE)
 public status_date!: Date;

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
