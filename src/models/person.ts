// person.ts
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, HasOne } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Division, Gender } from './enums';
import { Candidate } from './candidate';

interface PersonAttributes {
    id: number;
    name: string;
    email: string;
    celphone: number;
    gender: Gender;
    image: string;
    division: Division;
    tech_stack: string;
    skills: string[];
    candidateInformation: Candidate;
    activeDB: boolean;
}

export interface PersonCreationAttributes extends Optional<PersonAttributes, 'id' | 'activeDB' | "candidateInformation"> {}

@Table({
 tableName: 'person',
 timestamps: true,
 paranoid: true,
})
export class Person extends Model<PersonAttributes, PersonCreationAttributes> {

 @Column(DataType.STRING(128))
 public name!: string;

 @Column(DataType.STRING(128))
 public email!: string;

 @Column(DataType.DOUBLE(11))
 public celphone!: number;

 @Column(DataType.STRING(128))
 public gender!: string;

 @Column(DataType.STRING(128))
 public image!: string;

 @Column(DataType.ENUM(...Object.values(Division)))
 public division!: Division;

 @Column(DataType.STRING(128))
 public tech_stack!: string;

 @Column(DataType.ARRAY(DataType.STRING))
 public skills!: string[];

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

 @HasOne(() => Candidate)
 public candidateInformation!: Candidate
}
