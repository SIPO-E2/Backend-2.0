import { Request, Response } from "express";
import { UserRole } from '../models';
import { UserRoleCreationAttributes } from '../models/userRole';
import { User } from '../models';
import { Role } from '../models';

// Getting all user roles
export const getUserRoles = async(req: Request, res: Response) => {
    const { from = 0, to = 5 } = req.query;

    // DB
    await UserRole.findAll({ offset: Number(from), limit: Number(to), include: [{model: User, as: "user"}, {model: Role, as: "role"}]}).then(
        userRoles => {
            res.json({
                status: "success",
                message: "User roles found",
                data: userRoles,
            });
        }   
    ).catch( e =>{
        res.json({
            status: "error",
            message: "User roles not found",
            error: e
        });
    
    });
}

// Getting a specific user role by ID
export const getUserRole = async(req: Request, res: Response) => {
    const { id } = req.params;

    // DB
    await UserRole.findByPk(id, {include: [{model: User, as: "user"}, {model: Role, as: "role"}]}).then(
        userRole => {
            res.json({
                status: "success",
                message: "User role found",
                data: userRole,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "User role not found",
                error: e
            });
        }
    );
    
}

// Creating a new user role
export const postUserRole = async(req: Request, res: Response) => {
    const { userId, roleId }:UserRoleCreationAttributes = req.body;
    
    await UserRole.create({ userId, roleId }).then(
        userRole => {
            res.json({
                status: "success",
                message: "User role created",
                data: userRole,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "User role not created",
                error: e
            });
        }
    );
}

// Updating an existing user role
export const updateUserRole = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    await UserRole.update(resto, { where: { id } }).then(
        async () => {
            const updatedUserRole = await UserRole.findByPk(id, {include: [{model: User, as: "user"}, {model: Role, as: "role"}]});
            res.json({
                status: "success",
                message: "User role updated",
                data: updatedUserRole,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "User role not updated",
                error: e
            });
        }
    );
}

// Deleting a user role (soft delete)
export const deleteUserRole = async(req: Request, res: Response) => {
    const { id } = req.params;

    await UserRole.update({ activeDB: false}, { where: { id }}).then(
        () => {
            res.json({
                status: "success",
                message: "User role deleted",
                data: {
                    id
                },
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "User role not deleted",
                error: e
            });
        }
    );
}
