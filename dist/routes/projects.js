"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
// Controllers
const { getProjects, getProject, postProject, updateProject, deleteProject } = controllers_1.projectsController;
const router = (0, express_1.Router)();
router.get('/', getProjects);
router.get('/:id', [], getProject);
router.post("/", [], postProject);
router.patch("/:id", [], updateProject);
router.delete("/:id", [], deleteProject);
exports.default = router;
//# sourceMappingURL=projects.js.map