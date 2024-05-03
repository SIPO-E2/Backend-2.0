import { Request, Response } from "express";
import { Project } from "../models/project";
import { User } from "../models/user";
import { Client } from "../models/client";
import { JobPosition } from "../models/jobPosition";
import { Op } from "sequelize";

// Get a list of projects with advanced filters and pagination
export const getProjects = async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    name = "",
    updatedStart = "",
    updatedEnd = "",
    activeDB,
  } = req.query;

  const offset = (Number(page) - 1) * Number(limit);
  let updatedStartDate = updatedStart ? new Date(updatedStart.toString()) : null;
  let updatedEndDate = updatedEnd ? new Date(updatedEnd.toString()) : null;

  const whereClause = {
    ...(name && { name: { [Op.like]: `%${name}%` } }),
    ...(updatedStartDate && updatedEndDate && {
      updatedAt: { [Op.between]: [updatedStartDate, updatedEndDate] },
    }),
    ...(activeDB !== undefined && { activeDB: activeDB === "true" }),
  };

  try {
    const projects = await Project.findAll({
      where: whereClause,
      offset: offset,
      limit: Number(limit),
      include: [
        { model: User, as: "owner_user" },
        { model: Client, as: "owner_client" },
        { model: JobPosition, as: "job_positions_list" }
      ],
      order: [["updatedAt", "DESC"]],
    });

    res.json({
      status: "success",
      message: "Projects found",
      data: projects,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: await Project.count({ where: whereClause }),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: "error",
        message: "Projects not found",
        error: error.message,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "An unexpected error occurred",
      });
    }
  }
};

// Get a specific project by ID
export const getProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const project = await Project.findByPk(id, {
      include: [
        { model: User, as: "owner_user" },
        { model: Client, as: "owner_client" },
        { model: JobPosition, as: "job_positions_list" }
      ]
    });

    if (project) {
      res.json({
        status: "success",
        message: "Project found",
        data: project,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error retrieving project",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Create a new project
export const postProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.create(req.body, {
      include: [
        { model: User, as: "owner_user" },
        { model: Client, as: "owner_client" },
        { model: JobPosition, as: "job_positions_list" }
      ]
    });

    res.status(201).json({
      status: "success",
      message: "Project created",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Project not created",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update an existing project
export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updateResult = await Project.update(req.body, {
      where: { id },
      returning: true, // This option is for Sequelize to return the updated object
    });

    if (updateResult[0] === 1) {
      const updatedProject = await Project.findByPk(id);
      res.json({
        status: "success",
        message: "Project updated",
        data: updatedProject,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Project not updated",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Soft delete a project
export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await Project.update({ activeDB: false }, {
      where: { id }
    });

    if (result[0] > 0) {
      res.json({
        status: "success",
        message: "Project deleted",
        data: { id },
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Project not deleted",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};