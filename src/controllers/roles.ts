import { Request, Response } from "express";
import { Role } from '../models';
import { RoleCreationAttributes } from '../models/role';
import { User } from '../models';

// Getting all roles
export const getRoles = async(req: Request, res: Response) => {
    const { from = 0, to = 10 } = req.query;

    // DB
    await Role.findAll({ offset: Number(from), limit: Number(to), include: [{model: User, as: "users"}]}).then(
        roles => {
            res.json({
                status: "success",
                message: "Roles found",
                data: roles,
            });
        }   
    ).catch( e =>{
        res.json({
            status: "error",
            message: "Roles not found",
            error: e
        });
    
    });
}

// Getting a specific role by ID
export const getRole = async(req: Request, res: Response) => {
    const { id } = req.params;

    // DB
    await Role.findByPk(id, {include: [{model: User, as: "users"}]}).then(
        role => {
            res.json({
                status: "success",
                message: "Role found",
                data: role,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Role not found",
                error: e
            });
        }
    );
    
}

// Creating a new role
export const postRole = async(req: Request, res: Response) => {
    const { name }:RoleCreationAttributes = req.body;
    
    await Role.create({ name }, {include: [{model: User, as: "users"}]}).then(
        role => {
            res.json({
                status: "success",
                message: "Role created",
                data: role,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Role not created",
                error: e
            });
        }
    );
}

// Updating an existing role
export const updateRole = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    await Role.update(resto, { where: { id } }).then(
        async () => {
            const updatedRole = await Role.findByPk(id, {include: [{model: User, as: "users"}]});
            res.json({
                status: "success",
                message: "Role updated",
                data: updatedRole,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Role not updated",
                error: e
            });
        }
    );
}

// Deleting a role (soft delete)
export const deleteRole = async(req: Request, res: Response) => {
    const { id } = req.params;

    await Role.update({ activeDB: false}, { where: { id }}).then(
        () => {
            res.json({
                status: "success",
                message: "Role deleted",
                data: {
                    id
                },
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Role not deleted",
                error: e
            });
        }
    );
}
