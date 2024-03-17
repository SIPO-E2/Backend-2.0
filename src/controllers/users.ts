import { Request, Response } from "express";
import { User } from '../models';
import {UserCreationAttributes} from '../models/user';



// Getting users
export const getUsers = async(req: Request, res: Response) => {
    const { from = 0, to = 5 } = req.query;

    // DB
    await User.findAll({ offset: Number(from), limit: Number(to) }).then(
        users => {
            res.json({
                status: "success",
                message: "Users found",
                data: users,
            });
        }   
    ).catch( e =>{
        res.json({
            status: "error",
            message: "Users not found",
            error: e
        });
    
    });
}

// Getting a user
export const getUser = async(req: Request, res: Response) => {
    const { id } = req.params;

    // DB
    await User.findByPk(id).then(
        user => {
            res.json({
                status: "success",
                message: "User found",
                data: user,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "User not found",
                error: e
            });
        }
    );
    
}

// Creating a user
export const postUser = async(req: Request, res: Response) => {
    const { name, email, password, role }:UserCreationAttributes = req.body;
    
    await User.create({ name, email, password, role }).then(
        user => {
            res.json({
                status: "success",
                message: "User created",
                data: user,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "User not created",
                error: e
            });
        }
    );
}

// Updating a user
// Updating a user
export const putUser = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    await User.update(resto, { where: { id } }).then(
        async () => {
            const updatedUser = await User.findByPk(id);
            res.json({
                status: "success",
                message: "User updated",
                data: updatedUser,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "User not updated",
                error: e
            });
        }
    );
}

// Deleting a user (soft delete)
export const deleteUser = async(req: Request, res: Response) => {
    const { id } = req.params;

    await User.update({ activeDB: false}, { where: { id }}).then(
        () => {
            res.json({
                status: "success",
                message: "User deleted",
                data: {
                    id
                },
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "User not deleted",
                error: e
            });
        }
    );

}
