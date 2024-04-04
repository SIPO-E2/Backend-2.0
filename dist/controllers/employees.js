"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.postEmployee = exports.getEmployee = exports.getEmployees = void 0;
const employee_1 = require("../models/employee");
const models_1 = require("../models");
// Getting employees
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from = 0, to = 5 } = req.query;
    // DB
    yield employee_1.Employee.findAll({ offset: Number(from), limit: Number(to), include: [{ model: models_1.Opening, as: "openings" }] }).then((employees) => {
        res.json({
            status: "success",
            message: "employees found",
            data: employees,
        });
    }).catch((e) => {
        res.json({
            status: "error",
            message: "employees not found",
            error: e
        });
    });
});
exports.getEmployees = getEmployees;
// Getting a employee
const getEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // DB
    yield employee_1.Employee.findByPk(id, { include: [{ model: models_1.Opening, as: "openings" }] }).then((employee) => {
        res.json({
            status: "success",
            message: "employee found",
            data: employee,
        });
    }).catch((e) => {
        res.json({
            status: "error",
            message: "employee not found",
            error: e
        });
    });
});
exports.getEmployee = getEmployee;
// Creating a employee
const postEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, reason_current_status, salary, job_title, job_grade, joining_date, candidateId } = req.body;
    yield employee_1.Employee.create({ status, job_title, job_grade, joining_date, reason_current_status, salary, candidateId }, { include: [{ model: models_1.Opening, as: "openings" }] }).then((employee) => {
        res.json({
            status: "success",
            message: "employee created",
            data: employee,
        });
    }).catch((e) => {
        res.json({
            status: "error",
            message: "employee not created",
            error: e
        });
    });
});
exports.postEmployee = postEmployee;
// Updating a employee
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resto = __rest(req.body, []);
    yield employee_1.Employee.update(resto, { where: { id } }).then(() => __awaiter(void 0, void 0, void 0, function* () {
        const updatedEmployee = yield employee_1.Employee.findByPk(id, { include: [{ model: models_1.Opening, as: "openings" }] });
        res.json({
            status: "success",
            message: "Employee updated",
            data: updatedEmployee,
        });
    })).catch((e) => {
        res.json({
            status: "error",
            message: "employee not updated",
            error: e
        });
    });
});
exports.updateEmployee = updateEmployee;
// Deleting a employee (soft delete)
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield employee_1.Employee.update({ activeDB: false }, { where: { id } }).then(() => {
        res.json({
            status: "success",
            message: "Employee deleted",
            data: {
                id
            },
        });
    }).catch((e) => {
        res.json({
            status: "error",
            message: "employee not deleted",
            error: e
        });
    });
});
exports.deleteEmployee = deleteEmployee;
//# sourceMappingURL=employees.js.map