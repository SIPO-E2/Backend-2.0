import { Request, Response } from "express";
import { Client } from '../models';
import { User } from '../models';
import { Project } from "../models";
import { Employee } from "../models";
import { ClientCreationAttributes } from '../models/client';

// Getting clients
export const getClients = async (req: Request, res: Response) => {
    const { from = 0, to = 5 } = req.query;

    // DB
    await Client.findAll({ offset: Number(from), limit: Number(to), include: [{ model: User, as: "owner_user" }, { model: Project, as: "projects" }] }).then(
        clients => {
            res.json({
                status: "success",
                message: "Clients found",
                data: clients,
            });
        }
    ).catch(e => {
        res.json({
            status: "error",
            message: "Clients not found",
            error: e
        });

    });
}

// Getting a client
export const getClient = async (req: Request, res: Response) => {
    const { id } = req.params;

    // DB
    await Client.findByPk(id, { include: [{ model: User, as: "owner_user" }, { model: Project, as: "projects" }] }).then(
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
export const postClient = async (req: Request, res: Response) => {
    const { name, owner_user_id, division, details, high_growth, image, contract_pdf }: ClientCreationAttributes = req.body;

    if (!name || !owner_user_id || !division || !details || !high_growth || !image || !contract_pdf) {
        return res.status(400).json({
            status: "error",
            message: "All fields are required",
        });
    }

    if (isNaN(owner_user_id)) {
        return res.status(400).json({
            status: "error",
            message: "owner_user_id must be a valid number",
        });
    }

    // if user not found return error because the relationship is required
    const user = await User.findByPk(owner_user_id);
    if (!user) {
        res.json({
            status: "error",
            message: " User of Client not found",
        });
        return;
    }

    await Client.create({ name, owner_user_id, division, details, high_growth, image, contract_pdf }, { include: [{ model: User, as: "owner_user" }, { model: Project, as: "projects" }] }).then(
        async (client) => {
            const clientWithAssociations = await Client.findByPk(client.id, { include: [{ model: User, as: "owner_user" }, { model: Project, as: "projects" }] });
            res.json({
                status: "success",
                message: "Client created",
                data: clientWithAssociations,
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
export const updateClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    const ClientIdNumber = Number(id);

    if (isNaN(ClientIdNumber)) {
        return res.status(400).json({
            status: "error",
            message: "Client id must be a valid number",
        });
    }

    await Client.update(resto, { where: { id } })
        .then(async () => {
            const updatedClient = await Client.findByPk(id, { include: [{ model: User, as: "owner_user" }, { model: Project, as: "projects" }] });
            if (!updatedClient) {
                return res.status(404).json({
                    status: "error",
                    message: "Client not found",
                });
            }
            res.json({
                status: "success",
                message: "Allocation updated",
                data: updatedClient,
            });
        })
        .catch(
            e => {
                res.status(500).json({
                    status: "error",
                    message: "Client not updated",
                    error: e.toString(),
                });
            }
        );
}


//Delete a client(soft delete)
export const deleteClient = async (req: Request, res: Response) => {
    const { id } = req.params;

    const clientIdNumber = parseInt(id);

    if (!clientIdNumber || isNaN(clientIdNumber)) {
        return res.status(400).json({
            status: "error",
            message: "Client id must be valid a number",
        });
    }

    await Client.update({ activeDB: false }, { where: { id } }).then(
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