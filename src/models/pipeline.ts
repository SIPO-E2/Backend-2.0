// pipeline.ts
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Candidate } from './candidate';
import { Optional } from 'sequelize';

interface PipelineAttributes {
    id: number;
    candidateId: number;
    candidateInformation: Candidate;
    expectedSalary: number;
    pipelineSince: Date;
    pipelineEndDate: Date;
    activeDB: boolean;
}

export interface PipelineCreationAttributes extends Optional<PipelineAttributes, 'id' | 'activeDB' | "candidateInformation"> {}

@Table({
 tableName: 'pipeline',
 timestamps: true,
 paranoid: true,
})
export class Pipeline extends Model<PipelineAttributes, PipelineCreationAttributes> {

 @ForeignKey(() => Candidate)
 @Column(DataType.INTEGER)
 public candidateId!: number;

 @BelongsTo(() => Candidate)
 public candidateInformation!: Candidate;

 @Column(DataType.FLOAT)
 public expectedSalary!: number;

 @Column(DataType.DATE)
 public pipelineSince!: Date;

 @Column(DataType.DATE)
 public pipelineEndDate!: Date;

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
