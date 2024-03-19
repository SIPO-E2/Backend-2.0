import { Request, Response } from "express";
import { JobPosition } from "../models/jobPosition";
import { JobPositionCreationAttributes } from "../models/jobPosition";

// Get all job positions
export const getAllJobPositions = async (req: Request, res: Response) => {
  // Corrección: Uso de 'limit' y 'offset' para la paginación, con valores predeterminados más claros
  const limit = parseInt(req.query.limit as string) || 5;
  const offset = parseInt(req.query.offset as string) || 0;

  try {
    const jobPositions = await JobPosition.findAll({ offset, limit });
    res.json({
      status: "success",
      message: "All job positions found",
      data: jobPositions,
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Error fetching job positions",
      error: e.toString(),
    });
  }
};
// Get job position by id
export const getJobPositionById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "Invalid job position ID",
    });
  }

  try {
    const jobPosition = await JobPosition.findByPk(id);
    if (!jobPosition) {
      return res.status(404).json({
        status: "error",
        message: "Job position not found",
      });
    }
    res.json({
      status: "success",
      message: "Job position found",
      data: jobPosition,
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Error fetching job position",
      error: e.toString(),
    });
  }
};

// Create a new job position
export const createJobPosition = async (req: Request, res: Response) => {
  try {
    const jobPosition = await JobPosition.create(
      req.body as JobPositionCreationAttributes
    );
    res.json({
      status: "success",
      message: "Job position created",
      data: jobPosition,
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Error creating job position",
      error: e.toString(),
    });
  }
};

// Update a job position
export const updateJobPosition = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "Invalid job position ID",
    });
  }

  try {
    await JobPosition.update(req.body, { where: { id } });
    const updatedJobPosition = await JobPosition.findByPk(id);
    res.json({
      status: "success",
      message: "Job position updated",
      data: updatedJobPosition,
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Error updating job position",
      error: e.toString(),
    });
  }
};

// Soft Delete to job position
export const deleteJobPosition = async (req: Request, res: Response) => {
  const { id } = req.params;

  await JobPosition.update({ activeDB: false }, { where: { id: id } })
    .then(() => {
      res.json({
        status: "success",
        message: "Job position deleted",
        data: {
          id,
        },
      });
    })
    .catch((e) => {
      res.status(500).json({
        status: "error",
        message: "Job position not deleted",
        error: e.toString(),
      });
    });
};
