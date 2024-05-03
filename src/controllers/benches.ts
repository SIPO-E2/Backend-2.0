import { Request, Response } from "express";
import { Bench } from '../models/bench';
import { Employee } from '../models/employee';
import { BenchCreationAttributes } from '../models/bench';
import { Candidate, Person } from "../models";

// Getting benches
// Getting benches
export const getBenches = async(req: Request, res: Response) => {
  // DB
  await Bench.findAll({ 
    include: [
    {
      model: Employee,
      as: 'employeeInformation',
      include: [
        {
          model: Candidate,
          as: 'candidateInformation',
          include: [
            {
              model: Person,
              as: 'personInformation'
            }
          ]
        }]
      }
    ]
  }).then(
      (benches) => {
          res.json({
              status: "success",
              message: "Benches found",
              data: benches,
          });
      }   
  ).catch( (e) =>{
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

 await Bench.findByPk(id, { include:
  [
    { 
      model: Employee, 
      as: 'employeeInformation' ,
      include: 
      [
        { 
          model: Candidate, 
          as: 'candidateInformation',
          include:[
            {
              model: Person,
              as: 'personInformation'
            }
          ]
        }
      ]
    }
  ] }).then(
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

export const postBench = async(req: Request, res: Response) => {
  const { benchSince, billingStartDate, employeeId }: BenchCreationAttributes = req.body;
  
  try {
      // Verificar si el empleado con el ID proporcionado existe
      const employee = await Employee.findByPk(employeeId);
      if (!employee) {
          return res.status(404).json({
              status: "error",
              message: "Employee not found",
          });
      }

      // Crear el nuevo banco asociado al empleado encontrado
      const bench = await Bench.create({
          benchSince,
          billingStartDate,
          employeeId,
          employeeInformation: employee // Asociar el objeto de empleado
      });

      res.json({
          status: "success",
          message: "Bench created",
          data: bench,
      });
  } catch (error) {
      res.status(500).json({
          status: "error",
          message: "Bench not created",
          error: error
      });
  }
}


// Updating an existing bench and their employee
export const updateBench = async(req: Request, res: Response) => {
 const { id } = req.params;
 const { ...resto } = req.body;

 await Bench.update(resto, { where: { id } }).then(
    async () => {
      const updatedBench = await Bench.findByPk(id, { include:
        [
          { 
            model: Employee, 
            as: 'employeeInformation' ,
            include: 
            [
              { 
                model: Candidate, 
                as: 'candidateInformation',
                include:[
                  {
                    model: Person,
                    as: 'personInformation'
                  }
                ]
              }
            ]
          }
        ] });
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
