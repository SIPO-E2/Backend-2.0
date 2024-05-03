import { Request, Response } from "express";
import { Interview } from '../models';
import { Allocation } from "../models";
import { InterviewCreationAttributes } from '../models/interview';

// Getting all interviews
export const getInterviews = async (req: Request, res: Response) => {
    await Interview.findAll({ include: [{ model: Allocation, as: 'allocation' }] }).then(
        interviews => {
            res.json({
                status: "success",
                message: "Interviews found",
                data: interviews,
            });
        }
    ).catch(e => {
        res.json({
            status: "error",
            message: "Interviews not found",
            error: e
        });
    });
}

// Getting a specific interview by ID
export const getInterview = async (req: Request, res: Response) => {
    const { id } = req.params;

    await Interview.findByPk(id, { include: [{ model: Allocation, as: 'allocation' }] }).then(
        interview => {
            res.json({
                status: "success",
                message: "Interview found",
                data: interview,
            });
        }
    ).catch(e => {
        res.json({
            status: "error",
            message: "Interview not found",
            error: e
        });
    });
}

// Creating a new interview
export const postInterview = async (req: Request, res: Response) => {
    const { allocation, status_date, interview_date, allocation_id, status, reason_current_status }: InterviewCreationAttributes = req.body;

    if (!allocation || !status_date || !interview_date || !allocation_id || !status || !reason_current_status) {
        return res.status(400).json({
            status: "error",
            message: "All fields are required",
        });
    }

    if (isNaN(allocation_id)) {
        return res.status(400).json({
            status: "error",
            message: "allocation_id must be a valid number",
        });
    }

    const user = await Interview.findByPk(allocation_id);
    if (!user) {
        res.json({
            status: "error",
            message: "Allocation of Interview not found",
        });
        return;
    }

    await Interview.create({ allocation, status_date, interview_date, allocation_id, status, reason_current_status }).then(
        interview => {
            res.json({
                status: "success",
                message: "Interview created",
                data: interview,
            });
        }
    ).catch(e => {
        res.json({
            status: "error",
            message: "Interview not created",
            error: e
        });
    });
}

// Updating an existing interview
export const updateInterview = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    const interviewIdNumber = Number(id);

    if (isNaN(interviewIdNumber)) {
        return res.status(400).json({
            status: "error",
            message: "Interview id must be a valid number",
        });
    }

    await Interview.update(resto, { where: { id } }).then(
        async () => {
            const updatedInterview = await Interview.findByPk(id, { include: [{ model: Allocation, as: 'allocation' }] });
            if (!updatedInterview) {
                return res.status(404).json({
                    status: "error",
                    message: "Interview not found",
                });
            }
            res.json({
                status: "success",
                message: "Interview updated",
                data: updatedInterview,
            });
        })
        .catch(e => {
            res.json({
                status: "error",
                message: "Interview not updated",
                error: e
            });
        });
}

// Deleting an interview (soft delete)
export const deleteInterview = async (req: Request, res: Response) => {
    const { id } = req.params;

    const interviewIdNumber = parseInt(id);

    if (!interviewIdNumber || isNaN(interviewIdNumber)) {
        return res.status(400).json({
            status: "error",
            message: "Interview id must be a valid number",
        });
    }

    await Interview.update({ activeDB: false }, { where: { id } }).then(
        () => {
            res.json({
                status: "success",
                message: "Interview deleted",
                data: {
                    id
                },
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Interview not deleted",
                error: e
            });
        }
    );
}

