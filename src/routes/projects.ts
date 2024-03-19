import { Router } from "express";
import { projectsController } from "../controllers";

// Controllers
const { getProjects, getProject, postProject, putProject, deleteProject } =
  projectsController;

const router: Router = Router();

router.get("/", getProjects);

router.get("/:id", [], getProject);

router.post("/", [], postProject);

router.put("/:id", [], putProject);

router.delete("/:id", [], deleteProject);

export default router;
