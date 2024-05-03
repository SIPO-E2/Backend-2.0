import { Request, Response } from "express";
import { Employee, Project, User } from '../models';
import { JobPosition } from '../models';
import { Opening } from '../models';
import { OpeningCreationAttributes } from '../models/opening';


// Getting openings
export const getOpenings = async (req: Request, res: Response) => {
  const { from = 0, to = 5 } = req.query;

  // DB
  await Opening.findAll({ offset: Number(from), limit: Number(to), include: [{ model: JobPosition, as: "owner_jobPosition", include: [{ model: Project, as: "owner_project", include: [{ model: User, as: "owner_user" }] }] }] })
    .then((openings) => {
      res.json({
        status: "success",
        message: "Openings found",
        data: openings,
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "Openings not found",
        error: e,
      });
    });
};

// Getting a opening
export const getOpening = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Opening.findByPk(id, { include: [{ model: JobPosition, as: "owner_jobPosition", include: [{ model: Project, as: "owner_project", include: [{ model: User, as: "owner_user" }] }] }] })
    .then((openings) => {
      res.json({
        status: "success",
        message: "Opening found",
        data: openings,
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "Opening not found",
        error: e,
      });
    });
};

// Creating a opening
export const postOpening = async (req: Request, res: Response) => {
  const { status, reason_current_status, open_date, close_date, close_reason, hours_required, owner_jobPosition_id }: OpeningCreationAttributes = req.body;

  if (!status || !reason_current_status || !open_date || !close_date || !close_reason || !hours_required || !owner_jobPosition_id) {
    return res.status(400).json({
      status: "error",
      message: "All fields are required",
    });
  }

  if (isNaN(owner_jobPosition_id)) {
    return res.status(400).json({
      status: "error",
      message: "owner_jobPosition_id must be a valid number",
    });
  }

  const jobPosition = await JobPosition.findByPk(owner_jobPosition_id);
  if (!jobPosition) {
    res.json({
      status: "error",
      message: "Job position of Opening not found",
    });
    return;
  }

  await Opening.create({ status, open_date, close_date, close_reason, hours_required, owner_jobPosition_id, reason_current_status }, { include: [{ model: JobPosition, as: "owner_jobPosition" }] }).then(
    async (opening) => {
      const openingWithAssociations = await Opening.findByPk(opening.id, { include: [{ model: JobPosition, as: "owner_jobPosition" }] });
      res.json({
        status: "success",
        message: "Opening created",
        data: openingWithAssociations,
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


// Updating a opening
export const updateOpening = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...resto } = req.body;

  const openingIdNumber = Number(id);

  if (isNaN(openingIdNumber)) {
    return res.status(400).json({
      status: "error",
      message: "Opening id must be valid a number",
    });
  }

  await Opening.update(resto, { where: { id } })
    .then(async () => {
      const updatedOpening = await Opening.findByPk(id, { include: [{ model: JobPosition, as: "owner_jobPosition" }] });
      if (!updatedOpening) {
        return res.status(404).json({
          status: "error",
          message: "Opening not found",
        });
      }
      res.json({
        status: "success",
        message: "Opening updated",
        data: updatedOpening,
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "Opening not updated",
        error: e,
      });
    });
};

// Deleting a opening (soft delete)
export const deleteOpening = async (req: Request, res: Response) => {
  const { id } = req.params;

  const openingIdNumber = parseInt(id);

  if (!openingIdNumber || isNaN(openingIdNumber)) {
    return res.status(400).json({
      status: "error",
      message: "Opening id must be valid a number",
    });
  }

  await Opening.update({ activeDB: false }, { where: { id } })
    .then(() => {
      res.json({
        status: "success",
        message: "Opening deleted",
        data: {
          id,
        },
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "Opening not deleted",
        error: e,
      });
    });
};