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
  // We get the data from the request body
  const {
    name,
    bill_rate,
    posting_type,
    division,
    skills_position,
    region,
    exclusivity,
    demand_curation,
    cross_division,
    image_url,
  }: JobPositionCreationAttributes = req.body;

  // We create a new job position with the data from the request body
  await JobPosition.create({
    name,
    bill_rate,
    posting_type,
    division,
    skills_position,
    region,
    exclusivity,
    demand_curation,
    cross_division,
    image_url,
  })
    .then((jobPosition) => {
      res.json({
        status: "success",
        message: "Job position created",
        data: jobPosition,
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "Job position not created",
        error: e,
      });
    });
};

// Update a job position
export const updateJobPosition = async (req: Request, res: Response) => {
  // We get the id from the request parameters, we get it from the URL
  const { id } = req.params;
  // ...resto do takes the rest of the properties from the request body and puts them in the variable resto
  // The ... means that we can have any number of properties in the request body and they will be put in the variable resto
  const { ...resto } = req.body;

  // In here we update the job position with the id from the request parameters and the resto object
  // The update method returns a promise, so we use then and catch to handle the result of the promise
  await JobPosition.update(resto, { where: { id } })
    .then(async () => {
      // If the update is successful we get the updated job position and send it in the response
      const jobPositionUpdated = await JobPosition.findByPk(id);
      res.json({
        status: "success",
        message: "Job position updated",
        data: jobPositionUpdated,
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "Job position not updated",
        error: e,
      });
    });
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
