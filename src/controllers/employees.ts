import { Request, Response } from "express";
import { Employee } from '../models/employee';
import {EmployeeCreationAttributes} from '../models/employee';




// Getting employees
export const getEmployees = async(req: Request, res: Response) => {
    const { from = 0, to = 5 } = req.query;

    // DB
    await Employee.findAll({ offset: Number(from), limit: Number(to) }).then(
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

    // DB
    await Employee.findByPk(id).then(
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
    const {  name, status, email, cellphone, job_title, job_grade, joining_date, division, tech_stack, gender, skills_employee, propose_action, reason_current_state, image_url}:EmployeeCreationAttributes = req.body;
    
    await Employee.create({  name, status, email, cellphone, job_title, job_grade, joining_date, division, tech_stack, gender, skills_employee, propose_action, reason_current_state, image_url}).then(
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
export const putEmployee = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    await Employee.update(resto, { where: { id } }).then(
        async () => {
            const updatedEmployee = await Employee.findByPk(id);
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