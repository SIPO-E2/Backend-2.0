import { Request, Response } from "express";
import { Employee } from '../models/employee';
// import { employeeModel } from '../models';
import {EmployeeCreationAttributes} from '../models/employee';



// Getting employees
export const getEmployees = async(req: Request, res: Response) => {
    const { from = 0, to = 5 } = req.query;

    // DB
    await Employee.findAll({ offset: Number(from), limit: Number(to) }).then(
        (        employees: any) => {
            res.json({
                status: "success",
                message: "employees found",
                data: employees,
            });
        }   
    ).catch( (e: any) =>{
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

    // DB
    await Employee.findByPk(id).then(
        (        employee: any) => {
            res.json({
                status: "success",
                message: "employee found",
                data: employee,
            });
        }
    ).catch(
        (        e: any) => {
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
    const { name, email, password, role } = req.body;
    
    await Employee.create({ name, email, password, role }).then(
        (        employee: any) => {
            res.json({
                status: "success",
                message: "employee created",
                data: employee,
            });
        }
    ).catch(
        (        e: any) => {
            res.json({
                status: "error",
                message: "employee not created",
                error: e
            });
        }
    );
}

// Updating a employee
export const putEmployee = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    await Employee.update(resto, { where: { id } }).then(
        (        employee: any) => {
            res.json({
                status: "success",
                message: "employee updated",
                data: employee,
            });
        }
    ).catch(
        (        e: any) => {
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

    const deletedEmployee = await Employee.update({ activeDB: false}, { where: { id }}).then(
        (        employee: any) => {
            res.json({
                status: "success",
                message: "employee deleted",
                data: employee,
            });
        }
    ).catch(
        (        e: any) => {
            res.json({
                status: "error",
                message: "employee not deleted",
                error: e
            });
        }
    );

}