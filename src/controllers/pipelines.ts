import { Request, Response } from "express";
import { Pipeline } from '../models/pipeline';
import { Candidate } from '../models/candidate';
import { PipelineCreationAttributes } from '../models/pipeline';
import { Person } from "../models";

// Getting all pipelines
export const getPipelines = async(req: Request, res: Response) => {
 const { from = 0, to = 5 } = req.query;

 await Pipeline.findAll({ offset: Number(from), limit: Number(to), 
  include: 
  [
    { 
      model: Candidate, 
      as: 'candidateInformation',
      include: 
      [
        { 
          model: Person, 
          as: 'personInformation' 
        }
      ]
    }
  ] }).then(
    pipelines => {
      res.json({
        status: "success",
        message: "Pipelines found",
        data: pipelines,
      });
    }   
 ).catch( e =>{
    res.json({
      status: "error",
      message: "Pipelines not found",
      error: e
    });
 });
}

// Getting a specific pipeline by ID, including their candidate
export const getPipeline = async(req: Request, res: Response) => {
 const { id } = req.params;

 await Pipeline.findByPk(id, { 
  include: 
  [
    { 
      model: Candidate, 
      as: 'candidateInformation',
      include: 
      [
        { 
          model: Person, 
          as: 'personInformation' 
        }
      ]
    }
  ] }).then(
    pipeline => {
      res.json({
        status: "success",
        message: "Pipeline found",
        data: pipeline,
      });
    }
 ).catch(
    e => {
      res.json({
        status: "error",
        message: "Pipeline not found",
        error: e
      });
    }
 );
}

// Creating a new pipeline and associating a candidate
export const postPipeline = async(req: Request, res: Response) => {
 const { expectedSalary, pipelineSince, pipelineEndDate, candidateId }: PipelineCreationAttributes = req.body;
  
 await Pipeline.create({ expectedSalary, pipelineSince, pipelineEndDate, candidateId }, { include: [{ model: Candidate, as: 'candidateInformation' }] }).then(
    pipeline => {
      res.json({
        status: "success",
        message: "Pipeline created",
        data: pipeline,
      });
    }
 ).catch(
    e => {
      res.json({
        status: "error",
        message: "Pipeline not created",
        error: e
      });
    }
 );
}

// Updating an existing pipeline and their candidate
export const updatePipeline = async(req: Request, res: Response) => {
 const { id } = req.params;
 const { ...resto } = req.body;

 await Pipeline.update(resto, { where: { id } }).then(
    async () => {
      const updatedPipeline = await Pipeline.findByPk(id, { include: [{ model: Candidate, as: 'candidateInformation' }] });
      res.json({
        status: "success",
        message: "Pipeline updated",
        data: updatedPipeline,
      });
    }
 ).catch(
    e => {
      res.json({
        status: "error",
        message: "Pipeline not updated",
        error: e
      });
    }
 );
}

// soft deleting an existing pipeline with activeDB set to false
export const deletePipeline = async(req: Request, res: Response) => {
 const { id } = req.params;

 await Pipeline.update({ activeDB: false }, { where: { id } }).then(
    () => {
      res.json({
        status: "success",
        message: "Pipeline deleted",
      });
    }
 ).catch(
    e => {
      res.json({
        status: "error",
        message: "Pipeline not deleted",
        error: e
      });
    }
 );
}
