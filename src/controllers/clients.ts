import { Request, Response } from "express";
import { Client } from '../models';
import {User} from '../models';
import {ClientCreationAttributes} from '../models/client';

// Getting clients
export const getClients = async(req: Request, res: Response) => {
    const { from = 0, to = 5 } = req.query;

    // DB
    await Client.findAll({ offset: Number(from), limit: Number(to) }).then(
        clients => {
            res.json({
                status: "success",
                message: "Clients found",
                data: clients,
            });
        }   
    ).catch( e =>{
        res.json({
            status: "error",
            message: "Clients not found",
            error: e
        });
    
    });
}

// Getting a client
export const getClient = async(req: Request, res: Response) => {
    const { id } = req.params;

    // DB
    await Client.findByPk(id).then(
        client => {
            res.json({
                status: "success",
                message: "Client found",
                data: client,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Client not found",
                error: e
            });
        }
    );
    
}

// Creating a client
export const postClient = async(req: Request, res: Response) => {
    const { name, user_id, division, details, high_growth, image }:ClientCreationAttributes = req.body;
    

    // if user not found return error because the relationship is required
    const user = await User.findByPk(user_id);
    if (!user) {
        res.json({
            status: "error",
            message: " User of Client not found",
        });
        return;
    }
    
    await Client.create({ name, user_id, user, division, details, high_growth, image }).then(
        client => {
            res.json({
                status: "success",
                message: "Client created",
                data: client,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Client not created",
                error: e
            });
        }
    );
}



// Updating a client
export const putClient = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    // dont update user_id
    delete resto.user_id;

    await Client.update(resto, { where: { id } }).then(
        async () => {
            const updatedClient = await Client.findByPk(id);
            res.json({
                status: "success",
                message: "Client updated",
                data: updatedClient,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Client not updated",
                error: e
            });
        }
    );
}


//Delete a client(soft delete)
export const deleteClient = async(req: Request, res: Response) => {
    const { id } = req.params;

    await Client.update({activeDB:false},{ where: { id } }).then(
        () => {
            res.json({
                status: "success",
                message: "Client deleted",
                data: {
                    id
                },
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Client not deleted",
                error: e
            });
        }
    );
}