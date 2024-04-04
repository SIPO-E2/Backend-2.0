import { Request, Response } from "express";
import { EmployeeOpening } from '../models';
import { EmployeeOpeningCreationAttributes } from '../models/employeeOpening';
import { Employee } from '../models';
import { Opening } from '../models';

// Getting all employee openings
export const getEmployeeOpenings = async(req: Request, res: Response) => {
    const { from = 0, to = 5 } = req.query;

    // DB
    await EmployeeOpening.findAll({ offset: Number(from), limit: Number(to), include: [{model: Employee, as: "employee"}, {model: Opening, as: "opening"}]}).then(
        employeeOpenings => {
            res.json({
                status: "success",
                message: "Employee openings found",
                data: employeeOpenings,
            });
        }   
    ).catch( e =>{
        res.json({
            status: "error",
            message: "Employee openings not found",
            error: e
        });
    
    });
}

// Getting a specific employee opening by ID
export const getEmployeeOpening = async(req: Request, res: Response) => {
    const { id } = req.params;

    // DB
    await EmployeeOpening.findByPk(id, {include: [{model: Employee, as: "employee"}, {model: Opening, as: "opening"}]}).then(
        employeeOpening => {
            res.json({
                status: "success",
                message: "Employee opening found",
                data: employeeOpening,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Employee opening not found",
                error: e
            });
        }
    );
    
}

// Creating a new employee opening
export const postEmployeeOpening = async(req: Request, res: Response) => {
    const { employeeId, openingId }:EmployeeOpeningCreationAttributes = req.body;
    
    await EmployeeOpening.create({ employeeId, openingId }).then(
        employeeOpening => {
            res.json({
                status: "success",
                message: "Employee opening created",
                data: employeeOpening,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Employee opening not created",
                error: e
            });
        }
    );
}

// Updating an existing employee opening
export const updateEmployeeOpening = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    await EmployeeOpening.update(resto, { where: { id } }).then(
        async () => {
            const updatedEmployeeOpening = await EmployeeOpening.findByPk(id, {include: [{model: Employee, as: "employee"}, {model: Opening, as: "opening"}]});
            res.json({
                status: "success",
                message: "Employee opening updated",
                data: updatedEmployeeOpening,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Employee opening not updated",
                error: e
            });
        }
    );
}

// Deleting an employee opening (soft delete)
export const deleteEmployeeOpening = async(req: Request, res: Response) => {
    const { id } = req.params;

    await EmployeeOpening.update({ activeDB: false}, { where: { id }}).then(
        () => {
            res.json({
                status: "success",
                message: "Employee opening deleted",
                data: {
                    id
                },
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Employee opening not deleted",
                error: e
            });
        }
    );
}
