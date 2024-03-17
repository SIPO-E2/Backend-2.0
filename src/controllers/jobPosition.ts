import { Request, Response } from "express";
import { JobPosition } from "../models/jobPosition";
import { JobPositionCreationAttributes } from "../models/jobPosition";

// Get all job positions
export const getAllJobPositions = async (req: Request, res: Response) => {
  // We add this so we can use the query parameters to paginate the results of the job positions
  // Example: /job-positions?from=0&limit=5
  const { from = 0, to = 5 } = req.query;

  await JobPosition.findAll({ offset: Number(from), limit: Number(to) })
    .then((jobPosition) => {
      res.json({
        status: "success",
        message: " All job positions found",
        data: jobPosition,
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "All job positions not found",
        error: e,
      });
    });
};

// Get job position by id
export const getJobPositionById = async (req: Request, res: Response) => {
  // We get the id from the request parameters, we get it from the URL
  const { id } = req.params;

  // We use the method findByPk to find the job position by its id
  await JobPosition.findByPk(id)
    .then((jobPosition) => {
      // We wrtite the response in JSON format
      res.json({
        status: "success",
        message: "Job position found",
        data: jobPosition,
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "Job position not found",
        error: e,
      });
    });
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
  } = req.body;

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
