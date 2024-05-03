import { Request, Response } from "express";
import { Billing } from '../models/billing';
import { Employee } from '../models/employee';
import { BillingCreationAttributes } from '../models/billing';
import { Candidate, Person } from "../models";

// Getting all billing records
export const getBillings = async(req: Request, res: Response) => {
 const { from = 0, to = 5 } = req.query;

 await Billing.findAll({ offset: Number(from), limit: Number(to), 
  include:
    [
      { 
        model: Employee, 
        as: 'employeeInformaztion' ,
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
    billings => {
      res.json({
        status: "success",
        message: "Billings found",
        data: billings,
      });
    }   
 ).catch( e =>{
    res.json({
      status: "error",
      message: "Billings not found",
      error: e
    });
 });
}

// Getting a specific billing record by ID, including their employee
export const getBilling = async(req: Request, res: Response) => {
 const { id } = req.params;

  if (!id) {
    res.json({
      status: "error",
      message: "ID not provided",
    });
    return;
  }

 await Billing.findByPk(id, { 
  include:
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
    billing => {
      res.json({
        status: "success",
        message: "Billing found",
        data: billing,
      });
    }
 ).catch(
    e => {
      res.json({
        status: "error",
        message: "Billing not found",
        error: e
      });
    }
 );
}

// Creating a new billing record and associating an employee
export const postBilling = async(req: Request, res: Response) => {
 const { billingSince, workHours, employeeId }: BillingCreationAttributes = req.body;

 if (!billingSince || !workHours || !employeeId) {
    res.json({
      status: "error",
      message: "Missing required fields",
    });
    return;
  }
  
 await Billing.create({ billingSince, workHours, employeeId }, { include: [{ model: Employee, as: 'employeeInformation' }] }).then(
    billing => {
      res.json({
        status: "success",
        message: "Billing created",
        data: billing,
      });
    }
 ).catch(
    e => {
      res.json({
        status: "error",
        message: "Billing not created",
        error: e
      });
    }
 );
}

// Updating an existing billing record and their employee
export const updateBilling = async(req: Request, res: Response) => {
 const { id } = req.params;
 const { ...resto } = req.body;

 if (!id) {
    res.json({
      status: "error",
      message: "ID not provided",
    });
    return;
  }

 await Billing.update(resto, { where: { id } }).then(
    async () => {
      const updatedBilling = await Billing.findByPk(id, { include: [{ model: Employee, as: 'employeeInformation' }] });
      res.json({
        status: "success",
        message: "Billing updated",
        data: updatedBilling,
      });
    }
 ).catch(
    e => {
      res.json({
        status: "error",
        message: "Billing not updated",
        error: e
      });
    }
 );
}

// soft deleting an existing billing record with activeDB set to false
export const deleteBilling = async(req: Request, res: Response) => {
 const { id } = req.params;

  if (!id) {
    res.json({
      status: "error",
      message: "ID not provided",
    });
    return;
  }

 await Billing.update({ activeDB: false }, { where: { id } }).then(
    () => {
      res.json({
        status: "success",
        message: "Billing deleted",
      });
    }
 ).catch(
    e => {
      res.json({
        status: "error",
        message: "Billing not deleted",
        error: e
      });
    }
 );
}
