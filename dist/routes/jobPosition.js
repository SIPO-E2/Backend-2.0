"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
// controllers
const { getAllJobPositions, getJobPositionById, createJobPosition, updateJobPosition, deleteJobPosition, } = controllers_1.jobPositionsController;
// Router
const router = (0, express_1.Router)();
// Routes
router.get("/", getAllJobPositions);
router.get("/:id", getJobPositionById);
router.post("/", createJobPosition);
router.patch("/:id", updateJobPosition);
// We add the id in delete route to delete the job position by its id
// but this in the future will be implemented with validation, so
// not everyone can delete a job position
router.delete("/:id", deleteJobPosition);
// We export the router to use it in the index.ts
exports.default = router;
//# sourceMappingURL=jobPosition.js.map