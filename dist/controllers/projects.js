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
exports.deleteProject = exports.putProject = exports.postProject = exports.getProject = exports.getProjects = void 0;
const project_1 = require("../models/project");
const user_1 = require("../models/user");
const client_1 = require("../models/client");
//Getting projects
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from = 0, to = 5 } = req.query;
    // DB
    yield project_1.Project.findAll({ offset: Number(from), limit: Number(to) }).then(projects => {
        res.json({
            status: "success",
            message: "Projects found",
            data: projects,
        });
    }).catch(e => {
        res.json({
            status: "error",
            message: "Projects not found",
            data: e,
        });
    });
});
exports.getProjects = getProjects;
//Getting a project
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //DB
    yield project_1.Project.findByPk(id).then(project => {
        res.json({
            status: "success",
            message: "Project found",
            data: project,
        });
    }).catch(e => {
        res.json({
            status: "error",
            message: "Project not found",
            data: e,
        });
    });
});
exports.getProject = getProject;
//Creating a project
const postProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, status, user_id, client_id, revenue, region, posting_date, exp_closure_date, image } = req.body;
    const owner = yield user_1.User.findByPk(user_id);
    const client = yield client_1.Client.findByPk(client_id);
    // if user or client not found return error because the relationship is required
    if (!client || !owner) {
        res.json({
            status: "error",
            message: "User or Client of Project not found",
            data: null,
        });
        return;
    }
    yield project_1.Project.create({ name, status, revenue, user_id, owner, client_id, client, region, posting_date, exp_closure_date, image }).then(project => {
        res.json({
            status: "success",
            message: "Project created",
            data: project,
        });
    }).catch(e => {
        res.json({
            status: "suerrorccess",
            message: "Project not created",
            data: e,
        });
    });
});
exports.postProject = postProject;
//Updating a project 
const putProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resto = __rest(req.body, []);
    yield project_1.Project.update(resto, { where: { id } }).then(() => __awaiter(void 0, void 0, void 0, function* () {
        const updatedProject = yield project_1.Project.findByPk(id);
        res.json({
            status: "success",
            message: "Project updated",
            data: updatedProject,
        });
    })).catch(e => {
        res.json({
            status: "error",
            message: "Project not updated",
            data: e,
        });
    });
});
exports.putProject = putProject;
//Deleting a user (soft delete)
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield project_1.Project.update({ activeDB: false }, { where: { id } }).then(() => {
        res.json({
            status: "success",
            message: "Project deleted",
            data: {
                id
            },
        });
    }).catch(e => {
        res.json({
            status: "success",
            message: "Project not deleted",
            data: e,
        });
    });
});
exports.deleteProject = deleteProject;
//# sourceMappingURL=projects.js.map