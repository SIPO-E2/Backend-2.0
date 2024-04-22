import { Request, Response } from "express";
import {
  JobPosition,
  JobPositionCreationAttributes,
} from "../models/jobPosition";
import { Project } from "../models/project";
import { Client } from "../models/client";
import { User } from "../models/user";
import { Opening } from "../models/opening";
import { Exclusivity, DemandCuration } from "../models/enums";


const determineDemandCuration =  (
  high_growth: boolean,
  exclusivity: Exclusivity
) => {

  if (high_growth && exclusivity === Exclusivity.Committed) {
    return DemandCuration.Strategic;
  } else if (high_growth && exclusivity === Exclusivity.Committed) {
    return DemandCuration.Committed;
  } else if (high_growth && exclusivity === Exclusivity.NonCommitted) {
    return DemandCuration.Open;
  }

  // Valor por defecto o manejo de casos no contemplados
  return DemandCuration.Open;
};


export const createJobPosition = async (req: Request, res: Response) => {
    const { name, bill_rate, posting_type, status, reason_current_status, division, openings_list = [], skills_position, region, exclusivity, cross_division, owner_project_id, image}:JobPositionCreationAttributes = req.body;
    
    const project = await Project.findByPk(owner_project_id, { include: [{model: Client, as: 'owner_client'}]});

    if (!project) {
      return res.status(400).json({
        status: "error",
        message: "Project of JobPosition not found",
      });
    }

    if (exclusivity != Exclusivity.Committed && exclusivity != Exclusivity.NonCommitted) {
      return res.status(400).json({
        status: "error",
        message: "Committed exclusivity is only available for high growth clients",
      });
    }
    
    const demand_curation:DemandCuration = determineDemandCuration(project.owner_client.high_growth, exclusivity);



    await JobPosition.create({
      name,
      status,
      reason_current_status,
      bill_rate,
      posting_type,
      division,
      skills_position,
      region,
      exclusivity,
      demand_curation,
      cross_division,
      owner_project_id,
      image,
    }, {include: [{model: Project, as: 'owner_project'}, {model: Opening, as: 'openings_list'}]}).then(
      async(jobPosition) => {
        const jobPositionWithAssociations = await JobPosition.findByPk(jobPosition.id, {include: [{model: Project, as: 'owner_project'}, {model: Opening, as: 'openings_list'}]});
        res.json({
          status: "success",
          message: "Job position created successfully",
          data: jobPositionWithAssociations,
        });
      }
    ).catch(
      e => {
        res.json({
          status: "error",
          message: "Job position not created",
          error: e
        });
      }
    );

};

// Get all job positions
export const getAllJobPositions = async (req: Request, res: Response) => {
  // Corrección: Uso de 'limit' y 'offset' para la paginación, con valores predeterminados más claros
  const limit = parseInt(req.query.limit as string) || 5;
  const offset = parseInt(req.query.offset as string) || 0;

  try {
    const jobPositions = await JobPosition.findAll({ offset, limit, 
      include: 
      [
        {
        model: Project,
        as: 'owner_project',
        include:
          [{
          model: Client,
          as: 'owner_client',
        }]
      }, {
        model: Opening,
        as: 'openings_list'
      }]
    });

    res.json({
      status: "success",
      message: "All job positions found",
      data: jobPositions,
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Error fetching job positions",
      error: e,
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
    const jobPosition = await JobPosition.findByPk(id, {include: [{model: Project, as: 'owner_project'}, {model: Opening, as: 'openings_list'}]} );
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
      error: e,
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
    const existingJobPosition = await JobPosition.findByPk(id, {include: [{model: Project, as: 'owner_project'}]});
    if (!existingJobPosition) {
      return res
      .status(404)
      .json({ status: "error", message: "Job position not found" });
    }
    const project = await Project.findByPk(existingJobPosition.owner_project_id, { include: [{model: Client, as: 'owner_client'}]});
    
    if (!project) {
      return res.status(400).json({
        status: "error",
        message: "Project of JobPosition not found",
      });
    }

    const { exclusivity } = req.body;

    const demand_curation:DemandCuration = determineDemandCuration(project.owner_client.high_growth, exclusivity);

    await JobPosition.update(
      { ...req.body, demand_curation},
      { where: { id } }
    );

    const updatedJobPosition = await JobPosition.findByPk(id, {include: [{model: Project, as: 'owner_project'}, {model: Opening, as: 'openings_list'}]});
    res.json({
      status: "success",
      message: "Job position updated",
      data: updatedJobPosition,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      message: "Error updating job position",
      error: e,
    });
  }
};

// Soft Delete a job position
export const deleteJobPosition = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "Invalid job position ID",
    });
  }

  try {
    await JobPosition.update({ activeDB: false }, { where: { id } });
    res.json({
      status: "success",
      message: "Job position deleted",
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Error deleting job position",
      error: e,
    });
  }
};