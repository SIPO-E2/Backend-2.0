import { Request, Response } from "express";
import { Interview } from '../models';
import { Allocation } from "../models";
import { InterviewCreationAttributes } from '../models/interview';

// Getting all interviews
export const getInterviews = async(req: Request, res: Response) => {
    await Interview.findAll({ include: [{ model: Allocation, as: 'allocation' }] }).then(
        interviews => {
            res.json({
                status: "success",
                message: "Interviews found",
                data: interviews,
            });
        }
    ).catch( e => {
        res.json({
            status: "error",
            message: "Interviews not found",
            error: e
        });
    });
}

// Getting a specific interview by ID
export const getInterview = async(req: Request, res: Response) => {
    const { id } = req.params;

    await Interview.findByPk(id, { include: [{ model: Allocation, as: 'allocation' }] }).then(
        interview => {
            res.json({
                status: "success",
                message: "Interview found",
                data: interview,
            });
        }
    ).catch( e => {
        res.json({
            status: "error",
            message: "Interview not found",
            error: e
        });
    });
}

// Creating a new interview
export const postInterview = async(req: Request, res: Response) => {
    const { status, reason_current_status, allocation_id, interview_date }: InterviewCreationAttributes = req.body;
    
    await Interview.create({ status, reason_current_status, allocation_id, interview_date }).then(
        interview => {
            res.json({
                status: "success",
                message: "Interview created",
                data: interview,
            });
        }
    ).catch( e => {
        res.json({
            status: "error",
            message: "Interview not created",
            error: e
        });
    });
}

// Updating an existing interview
export const updateInterview = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    await Interview.update(resto, { where: { id } }).then(
        async () => {
            const updatedInterview = await Interview.findByPk(id, { include: [{ model: Allocation, as: 'allocation' }] });
            res.json({
                status: "success",
                message: "Interview updated",
                data: updatedInterview,
            });
        }
    ).catch( e => {
        res.json({
            status: "error",
            message: "Interview not updated",
            error: e
        });
    });
}

// Deleting an interview (soft delete)
export const deleteInterview = async(req: Request, res: Response) => {
    const { id } = req.params;

    await Interview.update({ activeDB: false}, { where: { id }}).then(
        () => {
            res.json({
                status: "success",
                message: "Interview deleted",
                data: {
                    id
                },
            });
        }
    ).catch( e => {
        res.json({
            status: "error",
            message: "Interview not deleted",
            error: e
        });
    });
}
