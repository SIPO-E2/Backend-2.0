"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
// Controllers
const { getProjects, getProject, postProject, putProject, deleteProject } = controllers_1.projectsController;
const router = (0, express_1.Router)();
router.get('/', getProjects);
router.get('/:id', [], getProject);
router.post('/', [], postProject);
router.put('/:id', [], putProject);
router.delete('/:id', [], deleteProject);
exports.default = router;
//# sourceMappingURL=projects.js.map