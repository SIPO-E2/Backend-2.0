"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
// Controllers
const { getEmployees, getEmployee, postEmployee, updateEmployee, deleteEmployee } = controllers_1.employeesController;
// Router
const router = (0, express_1.Router)();
router.get('/', getEmployees);
router.get('/:id', [], getEmployee);
router.post('/', [], postEmployee);
router.patch('/:id', [], updateEmployee);
router.delete('/:id', [], deleteEmployee);
exports.default = router;
//# sourceMappingURL=employees.js.map