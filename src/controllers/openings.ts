import { Request, Response } from "express";
import { Opening } from '../models/opening';
import {OpeningCreationAttributes} from '../models/opening';


// Getting openings
export const getOpenings = async(req: Request, res: Response) => {
    const { from = 0, to = 5 } = req.query;

    // DB
    await Opening.findAll({ offset: Number(from), limit: Number(to) }).then(
        openings => {
            res.json({
                status: "success",
                message: "Openings found",
                data: openings,
            });
        }   
    ).catch( e =>{
        res.json({
            status: "error",
            message: "Openings not found",
            error: e
        });
    
    });
}

// Getting a opening
export const getOpening = async(req: Request, res: Response) => {
    const { id } = req.params;

    // DB
    await Opening.findByPk(id).then(
        openings => {
            res.json({
                status: "success",
                message: "Opening found",
                data: openings,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Opening not found",
                error: e
            });
        }
    );
    
}

// Creating a opening
export const createOpening = async(req: Request, res: Response) => {
    const { status_opening, open_date, close_date, close_reason, hours_required }:OpeningCreationAttributes = req.body;
    
    await Opening.create({ status_opening, open_date, close_date, close_reason, hours_required }).then(
        opening => {
            res.json({
                status: "success",
                message: "Opening created",
                data: opening,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Opening not created",
                error: e
            });
        }
    );
}

// Updating a user
export const editOpening = async(req: Request, res: Response) => {
    const { id } = req.params;

    await Opening.update({...req.body}, { where: { id } }).then(
        async () => {
            const openingUpdated = await Opening.findByPk(id);
            res.json({
                status: "success",
                message: "Opening updated",
                data: openingUpdated,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Opening not updated",
                error: e
            });
        }
    );
}

// export const seePostulates = async (req: Request, res: Response) => {
// }

// Deleting a user (soft delete)
export const deleteOpening = async (req: Request, res: Response) => {
    const { id } = req.params;

    await Opening.update({ activeDB: false}, { where: { id }}).then(
        () => {
            res.json({
                status: "success",
                message: "Opening deleted",
                data: {
                    id
                },
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Opening not deleted",
                error: e
            });
        }
    );
};