import { Router } from 'express';
import { projectsController } from '../controllers';


// Controllers
const {getAllProjects, getProjectById, postProject, putProject, deleteProject} = projectsController;

const router:Router = Router();


