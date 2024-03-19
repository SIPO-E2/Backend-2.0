import { Router } from "express";
import { jobPositionsController } from "../controllers";

// controllers
const {
  getAllJobPositions,
  getJobPositionById,
  createJobPosition,
  updateJobPosition,
  deleteJobPosition,
} = jobPositionsController;

// Router
const router: Router = Router();

// Routes
router.get("/", getAllJobPositions);
router.get("/:id", getJobPositionById);
router.post("/", createJobPosition);
router.put("/:id", updateJobPosition);
// We add the id in delete route to delete the job position by its id
// but this in the future will be implemented with validation, so
// not everyone can delete a job position
router.delete("/:id", deleteJobPosition);

// We export the router to use it in the index.ts
export default router;
