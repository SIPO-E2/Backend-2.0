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

// Update a job position
export const updateJobPosition = async (req: Request, res: Response) => {
  // We get the id from the request parameters, we get it from the URL
  const { id } = req.params;
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

  try {
    // We use the method update to update the job position by its id
    // updateCount is the number of updated rows
    const [updateCount] = await JobPosition.update(
      {
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
      },
      { where: { ID: id } } // Ensure this ID matches your database column name, Sequelize is case-sensitive
    );

    // If no rows were updated, return an error
    if (updateCount === 0) {
      return res.json({
        status: "error",
        message: "Job position not found or no data updated",
      });
    }

    // After successfully updating, fetch and return the updated job position
    const updatedJobPosition = await JobPosition.findByPk(id);
    if (!updatedJobPosition) {
      return res.json({
        status: "error",
        message: "Job position not found",
      });
    }

    res.json({
      status: "success",
      message: "Job position updated",
      data: updatedJobPosition,
    });
  } catch (e) {
    res.json({
      status: "error",
      message: "Job position not updated",
      error: e,
    });
  }
};
