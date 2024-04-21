// candidate.ts
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo, HasOne, HasMany } from 'sequelize-typescript';
import { Person } from './person';
import { Optional } from 'sequelize';
import { CandidateStatus, CandidateWorkStatus, ReasonCurrentStatus, ProposedAction} from './enums'; // Assuming you have an enum for CandidateStatus
import { Allocation } from './allocation';
import { Pipeline } from './pipeline';
import { Employee } from './employee';

interface CandidateAttributes {
    id: number;
    personId: number;
    personInformation: Person;
    status: CandidateStatus;
    workStatus: CandidateWorkStatus;
    reason_current_status: ReasonCurrentStatus;
    status_date: Date;
    propose_action: ProposedAction;
    allocations: Allocation[];
    activeDB: boolean;
}

export interface CandidateCreationAttributes extends Optional<CandidateAttributes, 'id' | 'activeDB'  | "personInformation" | "allocations"> {}

@Table({
 tableName: 'candidate',
 timestamps: true,
 paranoid: true,
})
export class Candidate extends Model<CandidateAttributes, CandidateCreationAttributes> {

 @ForeignKey(() => Person)
 @Column(DataType.INTEGER)
 public personId!: number;

 @BelongsTo(() => Person)
 public personInformation!: Person;

 @Column(DataType.ENUM(...Object.values(CandidateStatus)))
 public status!: CandidateStatus;

 @Column(DataType.ENUM(...Object.values(CandidateWorkStatus)))
 public workStatus!: CandidateWorkStatus;

 @Column(DataType.STRING(128))
 public reason_current_status!: string;

 @Column(DataType.DATE)
 public status_date!: Date;

 @Column(DataType.STRING(128))
 public propose_action!: string;

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
 
 //  In the controller check the status to see if the candidate is a Pipeline or Employee

 @HasOne(()=> Pipeline)
 public pipelineInformation!: Pipeline;


 @HasOne(()=> Employee)
 public employeeInformation!: Employee;

 @HasMany(()=> Allocation)
 public allocations!: Allocation[];

 
}
