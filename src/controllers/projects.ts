import { Request, Response } from "express";
import { Project } from "../models/project";
import { ProjectCreationAttributes } from "../models/project";
import { User } from "../models/user";
import { Client } from "../models/client";

//Getting projects

export const getProjects = async(req:Request, res:Response) => {
    const { from = 0, to = 5} = req.query;

  // DB
  await Project.findAll({ offset: Number(from), limit: Number(to) })
    .then((projects) => {
      res.json({
        status: "success",
        message: "Projects found",
        data: projects,
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "Projects not found",
        data: e,
      });
    });
};

//Getting a project

export const getProject = async( req: Request, res:Response) =>{
    const { id } = req.params;

  //DB
  await Project.findByPk(id)
    .then((project) => {
      res.json({
        status: "success",
        message: "Project found",
        data: project,
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "Project not found",
        data: e,
      });
    });
};

//Creating a project

export const postProject = async (req: Request, res: Response) => {
  const {
    name,
    status,
    user_id,
    client_id,
    region,
    job_positions = [],
    posting_date,
    exp_closure_date,
    image,
  }: ProjectCreationAttributes = req.body;

  const owner = await User.findByPk(user_id);
  const client = await Client.findByPk(client_id);

  // if user or client not found return error because the relationship is required
  if (!client || !owner) {
    res.json({
      status: "error",
      message: "User or Client of Project not found",
      data: null,
    });
    return;
  }

  await Project.create({
    name,
    status,
    user_id,
    owner,
    client_id,
    client,
    region,
    job_positions,
    posting_date,
    exp_closure_date,
    image,
  })
    .then(async(project) => {
      
      res.json({
        status: "success",
        message: "Project created",
        data: project,
      });
    })
    .catch((e) => {
      res.json({
        status: "suerrorccess",
        message: "Project not created",
        data: e,
      });
    });
    
};

//Updating a project
export const putProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...resto } = req.body;

  await Project.update(resto, { where: { id } })
    .then(async () => {
      const updatedProject = await Project.findByPk(id);
      res.json({
        status: "success",
        message: "Project updated",
        data: updatedProject,
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "Project not updated",
        data: e,
      });
    });
};

//Deleting a user (soft delete)
export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Project.update({ activeDB: false }, { where: { id } })
    .then(() => {
      res.json({
        status: "success",
        message: "Project deleted",
        data: {
          id,
        },
      });
    })
    .catch((e) => {
      res.json({
        status: "success",
        message: "Project not deleted",
        data: e,
      });
    });
};
