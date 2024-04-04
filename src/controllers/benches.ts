import { Request, Response } from "express";
import { Bench } from '../models/bench';
import { Employee } from '../models/employee';
import { BenchCreationAttributes } from '../models/bench';

// Getting all benches
export const getBenches = async(req: Request, res: Response) => {
 const { from = 0, to = 5 } = req.query;

 await Bench.findAll({ offset: Number(from), limit: Number(to), include: [{ model: Employee, as: 'employeeInformation' }] }).then(
    benches => {
      res.json({
        status: "success",
        message: "Benches found",
        data: benches,
      });
    }   
 ).catch( e =>{
    res.json({
      status: "error",
      message: "Benches not found",
      error: e
    });
 });
}

// Getting a specific bench by ID, including their employee
export const getBench = async(req: Request, res: Response) => {
 const { id } = req.params;

 await Bench.findByPk(id, { include: [{ model: Employee, as: 'employeeInformation' }] }).then(
    bench => {
      res.json({
        status: "success",
        message: "Bench found",
        data: bench,
      });
    }
 ).catch(
    e => {
      res.json({
        status: "error",
        message: "Bench not found",
        error: e
      });
    }
 );
}

// Creating a new bench and associating an employee
export const postBench = async(req: Request, res: Response) => {
 const { benchSince, billingStartDate, employeeId }: BenchCreationAttributes = req.body;
  
 await Bench.create({ benchSince, billingStartDate, employeeId }, { include: [{ model: Employee, as: 'employeeInformation' }] }).then(
    bench => {
      res.json({
        status: "success",
        message: "Bench created",
        data: bench,
      });
    }
 ).catch(
    e => {
      res.json({
        status: "error",
        message: "Bench not created",
        error: e
      });
    }
 );
}

// Updating an existing bench and their employee
export const updateBench = async(req: Request, res: Response) => {
 const { id } = req.params;
 const { ...resto } = req.body;

 await Bench.update(resto, { where: { id } }).then(
    async () => {
      const updatedBench = await Bench.findByPk(id, { include: [{ model: Employee, as: 'employeeInformation' }] });
      res.json({
        status: "success",
        message: "Bench updated",
        data: updatedBench,
      });
    }
 ).catch(
    e => {
      res.json({
        status: "error",
        message: "Bench not updated",
        error: e
      });
    }
 );
}

// soft deleting an existing bench with activeDB set to false
export const deleteBench = async(req: Request, res: Response) => {
 const { id } = req.params;

 await Bench.update({ activeDB: false }, { where: { id } }).then(
    () => {
      res.json({
        status: "success",
        message: "Bench deleted",
      });
    }
 ).catch(
    e => {
      res.json({
        status: "error",
        message: "Bench not deleted",
        error: e
      });
    }
 );
}
