import { Request, Response} from 'express';
import { Project } from '../models/project';
import { ProjectCreationAttributes } from '../models/project';


//Getting projects

export const getAllProjects = async(req:Request, res:Response) => {
    const { from = 0, to = 5} = req.query;

    // DB
    await Project.findAll({offset: Number(from), limit:Number(to) }).then(
        projects => {
            res.json({
                status: "success",
                message: "Projects found",
                data: projects,
            });
        }
    ).catch( e => {
        res.json({
            status: "error",
            message: "Projects not found",
            data: e,
        });
    });
}

//Getting a project

export const getProjectById = async( req: Request, res:Response) =>{
    const { id } = req.params;

    //DB
    await Project.findByPk(id).then(
        project => {
            res.json({
                status: "success",
                message: "Project found",
                data: project,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Project not found",
                data: e,
            });
        }
    );
}


//Creating a project

export const postProject = async(req: Request, res: Response) =>{
    const{ name, status, revenue, owner, region, posting_date, exp_closure_date, image } = req.body;

    await Project.create({ name, status, revenue, owner, region, posting_date, exp_closure_date, image}).then(
        project => {
            res.json({
                status: "success",
                message: "Project created",
                data: project,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "suerrorccess",
                message: "Project not created",
                data: e,
            });
        }
    );
}

//Updating a project 

export const putProject = async(req:Request, res:Response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    await Project.update(resto, { where: { id }}).then(
        project => {
            res.json({
                status: "success",
                message: "Project updated",
                data: project,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Project not updated",
                data: e,
            });
        }
    );
}


//Deleting a user (soft delete)
export const deleteProject = async (req:Request, res:Response) => {
    const { id } = req.params;

    const project = await Project.update({ activeDB: false}, { where: { id }}).then(
        project => {
            res.json({
                status: "success",
                message: "Project deleted",
                data: project,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "success",
                message: "Project not deleted",
                data: e,
            });
        }
    );
}
