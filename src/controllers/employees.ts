import { Request, Response } from "express";
import { Employee } from '../models/employee';
import {EmployeeCreationAttributes} from '../models/employee';
import { Candidate, Opening, Person } from "../models";

// Getting employees
export const getEmployees = async(req: Request, res: Response) => {
    const { from = 0, to = 100 } = req.query;

    // DB
    await Employee.findAll({ offset: Number(from), limit: Number(to), 
        include:
        [
            
            { model: Candidate, 
                as: 'candidateInformation',
                include: 
                [
                  { 
                    model: Person, 
                    as: 'personInformation' 
                  }
                ]
            },
            {model:Opening,as: "openings"} 
        
        ] }).then(
        (        employees) => {
            res.json({
                status: "success",
                message: "employees found",
                data: employees,
            });
        }   
    ).catch( (e) =>{
        res.json({
            status: "error",
            message: "employees not found",
            error: e
        });
    
    });
}

// Getting a employee
export const getEmployee = async(req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.json({
            status: "error",
            message: "ID not provided",
        });
        return;
    }

    // DB
    await Employee.findByPk(id, {
        include:
        [
            
            { model: Candidate, 
                as: 'candidateInformation',
                include: 
                [
                  { 
                    model: Person, 
                    as: 'personInformation' 
                  }
                ]
            },
            {model:Opening,as: "openings"} 
        
        ]}).then(
        (employee) => {
            res.json({
                status: "success",
                message: "employee found",
                data: employee,
            });
        }
    ).catch(
        (        e) => {
            res.json({
                status: "error",
                message: "employee not found",
                error: e
            });
        }
    );
    
}

// Creating a employee
export const postEmployee = async(req: Request, res: Response) => {
    const { status, reason_current_status, salary, job_title, job_grade, joining_date, candidateId }:EmployeeCreationAttributes = req.body;
    
    if (!status || !reason_current_status || !salary || !job_title || !job_grade || !joining_date || !candidateId) {
        res.json({
            status: "error",
            message: "Please provide all required fields",
        });
        return;
    }

    await Employee.create({  status, job_title, job_grade, joining_date, reason_current_status, salary, candidateId}, {include:[{model:Opening,as: "openings"} ]}).then(
        (        employee) => {
            res.json({
                status: "success",
                message: "employee created",
                data: employee,
            });
        }
    ).catch(
        (        e) => {
            res.json({
                status: "error",
                message: "employee not created",
                error: e
            });
        }
    );
}

// Updating a employee
export const updateEmployee = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    if (!id) {
        res.json({
            status: "error",
            message: "ID not provided",
        });
        return;
    }

    await Employee.update(resto, { where: { id } }).then(
        async () => {
            const updatedEmployee = await Employee.findByPk(id, {include:[{model:Opening,as: "openings"} ]});
            res.json({
                status: "success",
                message: "Employee updated",
                data: updatedEmployee,
            });
        }
    ).catch(
        (e) => {
            res.json({
                status: "error",
                message: "employee not updated",
                error: e
            });
        }
    );
}

// Deleting a employee (soft delete)
export const deleteEmployee = async(req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.json({
            status: "error",
            message: "ID not provided",
        });
        return;
    }

    await Employee.update({ activeDB: false}, { where: { id }}).then(
        () => {
            res.json({
                status: "success",
                message: "Employee deleted",
                data: {
                    id
                },
            });
        }
    ).catch(
        (        e) => {
            res.json({
                status: "error",
                message: "employee not deleted",
                error: e
            });
        }
    );

}