import { Router } from "express";
import { projectsController } from "../controllers";

// Controllers
const {getProjects, getProject, postProject, updateProject, deleteProject} = projectsController;

const router: Router = Router();

router.get('/', getProjects);

router.get('/:id', [
], getProject);

router.post("/", [], postProject);

router.patch("/:id", [], updateProject);

router.delete("/:id", [], deleteProject);

export default router;