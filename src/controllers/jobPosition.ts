import { Request, Response } from "express";
import { JobPosition } from "../models/jobPosition";
import { JobPositionCreationAttributes } from "../models/jobPosition";

// Get all job positions
export const getAllJobPositions = async (req: Request, res: Response) => {
  // We add this so we can use the query parameters to paginate the results of the job positions
  // Example: /job-positions?from=0&limit=5
  const { from = 0, to = 5 } = req.query;

  // findAll works to get all the job positions from the db
  // We use the offset and limit options to paginate the results
  // offset is the number of records to skip
  // limit is the number of records to return
  // So in this case we are returning every 5 job positions
  await JobPosition.findAll({ offset: Number(from), limit: Number(to) })
    // if the promise is resolved, we get the job positions and we write the response in JSON format
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
  // findByPk works with the primary key of the table
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
  // ...resto do takes the rest of the properties from the request body and puts them in the variable resto
  // The ... means that we can have any number of properties in the request body and they will be put in the variable resto
  const { ...resto } = req.body;

  // In here we update the job position with the id from the request parameters and the resto object
  // The update method returns a promise, so we use then and catch to handle the result of the promise
  await JobPosition.update(resto, { where: { ID: id } })
    // jobPosition is the updated job position, it contains the updated data of the job position
    .then((jobPosition) => {
      res.json({
        status: "success",
        message: "Job position updated",
        data: jobPosition,
      });
    })
    // If jobPosition does not exist, we return an error
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
  // We get the id from the request parameters, we get it from the URL
  const { id } = req.params;

  // The { where: { ID: id } } is to make sure this matches the model's column name for the ID
  // And also {activeDB: false} is to make sure that the job position is not active
  // update returns an array with two elements, the number of affected rows and the affected rows
  // In here we are using soft delete, so we are not deleting the job position from the db
  // This returns a promise, so we use then and catch to handle the result of the promise
  JobPosition.update(
    { activeDB: false },
    { where: { ID: id } } // To make sure this matches the model's column name for the ID
  )

    // affectedRows has how many rows were affected (updayted) by the query. If affectedRows is greater than 0, it means
    // the update operation did indeed modify one (in this case is mostly 1) or more rows. If affectedRows is 0, it means no rows were updated,
    //which could happen if the conditions in the where clause didn't match any rows.
    .then(([affectedRows]) => {
      if (affectedRows === 0) {
        return res.status(404).json({
          status: "error",
          message: "Job position not found",
        });
      }
      res.json({
        status: "success",
        message: "Job position deleted",
        affectedRows: affectedRows,
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
