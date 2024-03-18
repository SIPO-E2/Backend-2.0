import { Router } from 'express';
import { projectsController } from '../controllers';


// Controllers
const {getAllProjects, getProjectById, postProject, putProject, deleteProject} = projectsController;

const router:Router = Router();


router.get('/', getAllProjects);

router.get('/:id', [
], getProjectById);

router.post('/',[
], postProject);

router.put('/:id', [
], putProject);

router.delete('/:id', [
], deleteProject);


export default router;
