import { Request, Response } from "express";
import { Allocation } from '../models';
import { Candidate, JobPosition, Client, Interview } from '../models';
import { AllocationCreationAttributes } from '../models/allocation';

// Getting all allocations
export const getAllocations = async (req: Request, res: Response) => {
    await Allocation.findAll({
        include: [
            { model: Candidate, as: 'candidate' },
            { model: JobPosition, as: 'jobPosition' },
            { model: Client, as: 'client' },
            { model: Interview, as: 'interviews' }
        ]
    }).then(
        allocations => {
            res.json({
                status: "success",
                message: "Allocations found",
                data: allocations,
            });
        }
    ).catch(e => {
        res.json({
            status: "error",
            message: "Allocations not found",
            error: e
        });
    });
}

// Getting a specific allocation by ID
export const getAllocation = async (req: Request, res: Response) => {
    const { id } = req.params;

    await Allocation.findByPk(id, {
        include: [
            { model: Candidate, as: 'candidate' },
            { model: JobPosition, as: 'jobPosition' },
            { model: Client, as: 'client' },
            { model: Interview, as: 'interviews' }
        ]
    }).then(
        allocation => {
            res.json({
                status: "success",
                message: "Allocation found",
                data: allocation,
            });
        }
    ).catch(e => {
        res.json({
            status: "error",
            message: "Allocation not found",
            error: e
        });
    });
}

// Creating a new allocation
export const postAllocation = async (req: Request, res: Response) => {
    const { status, reason_current_status, candidateId, jobPositionId, client_id, details }: AllocationCreationAttributes = req.body;

    if (!status || !reason_current_status || !candidateId || !jobPositionId || !client_id || !details) {
        return res.status(400).json({
            status: "error",
            message: "All fields are required",
        });
    }
    if (isNaN(candidateId) || isNaN(jobPositionId) || isNaN(client_id)){
        return res.status(400).json({
            status: "error",
            message: "candidateId must be a valid number",
        });
    }

    await Allocation.create({ status, reason_current_status, candidateId, jobPositionId, client_id, details }).then(
        allocation => {
            res.json({
                status: "success",
                message: "Allocation created",
                data: allocation,
            });
        }
    ).catch(e => {
        res.json({
            status: "error",
            message: "Allocation not created",
            error: e
        });
    });
}

// Updating an existing allocation
// export const updateAllocation = async(req: Request, res: Response) => {
//     const { id } = req.params;
//     const { ...resto } = req.body;

//     await Allocation.update(resto, { where: { id } }).then(
//         async () => {
//             const updatedAllocation = await Allocation.findByPk(id, { 
//                 include: [
//                     { model: Candidate, as: 'candidate' },
//                     { model: JobPosition, as: 'jobPosition' },
//                     { model: Client, as: 'client' },
//                     { model: Interview, as: 'interviews' }
//                 ] 
//             });
//             res.json({
//                 status: "success",
//                 message: "Allocation updated",
//                 data: updatedAllocation,
//             });
//         }
//     ).catch( e => {
//         res.json({
//             status: "error",
//             message: "Allocation not updated",
//             error: e
//         });
//     });
// }

// Deleting an allocation (soft delete)
// export const deleteAllocation = async(req: Request, res: Response) => {
//     const { id } = req.params;

//     await Allocation.update({ activeDB: false}, { where: { id }}).then(
//         () => {
//             res.json({
//                 status: "success",
//                 message: "Allocation deleted",
//                 data: {
//                     id
//                 },
//             });
//         }
//     ).catch( e => {
//         res.json({
//             status: "error",
//             message: "Allocation not deleted",
//             error: e
//         });
//     });
// }

export const updateAllocation = async (req: Request, res: Response) => {
    const { candidateId, jobPositionId } = req.params;
    const { ...resto } = req.body;



    // const candidateIdNumber = Number(candidateId);
    // const jobPositionIdNumber = Number(jobPositionId);

    // if (isNaN(candidateIdNumber) || isNaN(jobPositionIdNumber)) {
    //     return res.status(400).json({
    //         status: "error",
    //         message: "candidateId and jobPositionId must be valid numbers",
    //     });
    // }

    await Allocation.update(resto, { where: { candidateId, jobPositionId } })
        .then(async () => {
            const updatedAllocation = await Allocation.findOne({
                where: { candidateId, jobPositionId },
                include: [Candidate, JobPosition],
            });
            if (!updatedAllocation) {
                return res.status(404).json({
                    status: "error",
                    message: "Allocation not found",
                });
            }
            res.json({
                status: "success",
                message: "Allocation updated",
                data: updatedAllocation,
            });
        })
        .catch((e) => {
            res.status(500).json({
                status: "error",
                message: "Allocation not updated",
                error: e.toString(),
            });
        });
};


export const deleteAllocation = async (req: Request, res: Response) => {
    const { candidateId, jobPositionId } = req.params;

    const candidateIdNumber = parseInt(candidateId);
    const jobPositionIdNumber = parseInt(jobPositionId);

    if (isNaN(candidateIdNumber) || isNaN(jobPositionIdNumber)) {
        return res.status(400).json({
            status: "error",
            message: "candidateId and jobPositionId must be valid numbers",
        });
    }

    // if (!candidateId || !jobPositionId || isNaN(candidateId) || isNaN(jobPositionId)) {
    //     return res.status(400).json({
    //         status: "error",
    //         message: "candidateId and jobPositionId must be valid numbers",
    //     });
    // }

    await Allocation.update({ activeDB: false }, { where: { candidateId: candidateId, jobPositionId: jobPositionId } })
        .then(() => {
            res.json({
                status: "success",
                message: "Allocation deleted",
                data: {
                    candidateId: candidateIdNumber,
                    jobPositionId: jobPositionIdNumber,
                },
            });
        })
        .catch((e) => {
            res.status(500).json({
                status: "error",
                message: "Allocation not deleted",
                error: e.toString(),
            });
        });
};
