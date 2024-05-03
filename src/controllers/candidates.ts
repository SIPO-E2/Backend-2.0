import { Request, Response } from "express";
import { Candidate } from '../models';
import { Person } from "../models";
import { CandidateCreationAttributes } from '../models/candidate';

// Getting all candidates
export const getCandidates = async(req: Request, res: Response) => {
    await Candidate.findAll({ include: [{ model: Person, as: 'personInformation' }] }).then(
        candidates => {
            res.json({
                status: "success",
                message: "Candidates found",
                data: candidates,
            });
        }
    ).catch( e => {
        res.json({
            status: "error",
            message: "Candidates not found",
            error: e
        });
    });
}

// Getting a specific candidate by ID
export const getCandidate = async(req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.json({
            status: "error",
            message: "ID not provided",
        });
        return;
    }

    await Candidate.findByPk(id, { include: [{ model: Person, as: 'personInformation' }] }).then(
        candidate => {
            res.json({
                status: "success",
                message: "Candidate found",
                data: candidate,
            });
        }
    ).catch( e => {
        res.json({
            status: "error",
            message: "Candidate not found",
            error: e
        });
    });
}

// Creating a new candidate
export const postCandidate = async(req: Request, res: Response) => {
    const { personId, status, workStatus, reason_current_status, status_date, propose_action }: CandidateCreationAttributes = req.body;

    if (!personId || isNaN(personId) || !status || !workStatus || !reason_current_status || !status_date || !propose_action) {
        res.json({
            status: "error",
            message: "Please provide all required fields and make sure personId is a number",
        });
        return;
    }
    
    await Candidate.create({ personId, status, workStatus, reason_current_status, status_date, propose_action }).then(
        candidate => {
            res.json({
                status: "success",
                message: "Candidate created",
                data: candidate,
            });
        }
    ).catch( e => {
        res.json({
            status: "error",
            message: "Candidate not created",
            error: e
        });
    });
}

// Updating an existing candidate
export const updateCandidate = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    if (!id) {
        res.json({
            status: "error",
            message: "ID not provided",
        });
        return;
    }

    await Candidate.update(resto, { where: { id } }).then(
        async () => {
            const updatedCandidate = await Candidate.findByPk(id, { include: [{ model: Person, as: 'personInformation' }] });
            res.json({
                status: "success",
                message: "Candidate updated",
                data: updatedCandidate,
            });
        }
    ).catch( e => {
        res.json({
            status: "error",
            message: "Candidate not updated",
            error: e
        });
    });
}

// Deleting a candidate (soft delete)
export const deleteCandidate = async(req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.json({
            status: "error",
            message: "ID not provided",
        });
        return;
    }

    await Candidate.update({ activeDB: false}, { where: { id }}).then(
        () => {
            res.json({
                status: "success",
                message: "Candidate deleted",
                data: {
                    id
                },
            });
        }
    ).catch( e => {
        res.json({
            status: "error",
            message: "Candidate not deleted",
            error: e
        });
    });
}
