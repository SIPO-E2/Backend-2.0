// persons.ts
import { Request, Response } from "express";
import { Person } from '../models';
import { Candidate } from '../models/candidate';
import { PersonCreationAttributes } from '../models/person';

// Getting all persons
export const getPersons = async(req: Request, res: Response) => {
 const { from = 0, to = 5 } = req.query;

 await Person.findAll({ offset: Number(from), limit: Number(to), include: [{ model: Candidate, as: 'candidateInformation' }] }).then(
    persons => {
      res.json({
        status: "success",
        message: "Persons found",
        data: persons,
      });
    }   
 ).catch( e =>{
    res.json({
      status: "error",
      message: "Persons not found",
      error: e
    });
  
 });
}

// Getting a specific person by ID, including their candidate
export const getPerson = async(req: Request, res: Response) => {
 const { id } = req.params;

 await Person.findByPk(id, { include: [{ model: Candidate, as: 'candidateInformation' }] }).then(
    person => {
      res.json({
        status: "success",
        message: "Person found",
        data: person,
      });
    }
 ).catch(
    e => {
      res.json({
        status: "error",
        message: "Person not found",
        error: e
      });
    }
 );
}

// Creating a new person and associating a candidate
export const postPerson = async(req: Request, res: Response) => {
 const { name, email, celphone, gender, image, division, tech_stack, skills}: PersonCreationAttributes & { candidate: Candidate } = req.body;
  
 // Assuming candidate is created separately and their ID is passed
 await Person.create({ name, email, celphone, gender, image, division, tech_stack, skills }, { include: [{ model: Candidate, as: 'candidateInformation' }] }).then(
    person => {
      res.json({
        status: "success",
        message: "Person created",
        data: person,
      });
    }
 ).catch(
    e => {
      res.json({
        status: "error",
        message: "Person not created",
        error: e
      });
    }
 );
}

// Updating an existing person and their candidate
export const updatePerson = async(req: Request, res: Response) => {
 const { id } = req.params;
 const { ...resto } = req.body;

 await Person.update(resto, { where: { id } }).then(
    async () => {
      const updatedPerson = await Person.findByPk(id, { include: [{ model: Candidate, as: 'candidateInformation' }] });
      res.json({
        status: "success",
        message: "Person updated",
        data: updatedPerson,
      });
    }
 ).catch(
    e => {
      res.json({
        status: "error",
        message: "Person not updated",
        error: e
      });
    }
 );
}


// soft deleting an existing person with activeDB set to false
export const deletePerson = async(req: Request, res: Response) => {
 const { id } = req.params;

 await Person.update({ activeDB: false }, { where: { id } }).then(
    () => {
      res.json({
        status: "success",
        message: "Person deleted",
      });
    }
 ).catch(
    e => {
      res.json({
        status: "error",
        message: "Person not deleted",
        error: e
      });
    }
 );
}
 
