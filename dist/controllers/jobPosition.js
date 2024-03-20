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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJobPosition = exports.updateJobPosition = exports.getJobPositionById = exports.getAllJobPositions = exports.createJobPosition = void 0;
const jobPosition_1 = require("../models/jobPosition");
const project_1 = require("../models/project");
const client_1 = require("../models/client");
const opening_1 = require("../models/opening");
const determineDemandCuration = (high_growth, exclusivity) => {
    if (high_growth && exclusivity === jobPosition_1.Exclusivity.Committed) {
        return jobPosition_1.DemandCuration.Strategic;
    }
    else if (high_growth && exclusivity === jobPosition_1.Exclusivity.Committed) {
        return jobPosition_1.DemandCuration.Committed;
    }
    else if (high_growth && exclusivity === jobPosition_1.Exclusivity.NonCommitted) {
        return jobPosition_1.DemandCuration.Open;
    }
    // Valor por defecto o manejo de casos no contemplados
    return jobPosition_1.DemandCuration.Open;
};
const createJobPosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, bill_rate, posting_type, division, openings_list = [], skills_position, region, exclusivity, cross_division, project_id, image_url } = req.body;
    const project = yield project_1.Project.findByPk(project_id, { include: [{ model: client_1.Client, as: 'client' }] });
    if (!project) {
        return res.status(400).json({
            status: "error",
            message: "Project of JobPosition not found",
        });
    }
    if (exclusivity != jobPosition_1.Exclusivity.Committed && exclusivity != jobPosition_1.Exclusivity.NonCommitted) {
        return res.status(400).json({
            status: "error",
            message: "Committed exclusivity is only available for high growth clients",
        });
    }
    const demand_curation = determineDemandCuration(project.client.high_growth, exclusivity);
    yield jobPosition_1.JobPosition.create({
        name,
        bill_rate,
        posting_type,
        division,
        skills_position,
        region,
        exclusivity,
        demand_curation,
        cross_division,
        project_id,
        image_url,
    }, { include: [{ model: project_1.Project, as: 'project' }, { model: opening_1.Opening, as: 'openings_list' }] }).then((jobPosition) => __awaiter(void 0, void 0, void 0, function* () {
        const jobPositionWithAssociations = yield jobPosition_1.JobPosition.findByPk(jobPosition.id, { include: [{ model: project_1.Project, as: 'project' }, { model: opening_1.Opening, as: 'openings_list' }] });
        res.json({
            status: "success",
            message: "Job position created successfully",
            data: jobPositionWithAssociations,
        });
    })).catch(e => {
        res.json({
            status: "error",
            message: "Job position not created",
            error: e
        });
    });
});
exports.createJobPosition = createJobPosition;
// Get all job positions
const getAllJobPositions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Corrección: Uso de 'limit' y 'offset' para la paginación, con valores predeterminados más claros
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;
    try {
        const jobPositions = yield jobPosition_1.JobPosition.findAll({ offset, limit, include: [{ model: project_1.Project, as: 'project' }, { model: opening_1.Opening, as: 'openings_list' }] });
        res.json({
            status: "success",
            message: "All job positions found",
            data: jobPositions,
        });
    }
    catch (e) {
        res.status(500).json({
            status: "error",
            message: "Error fetching job positions",
            error: e,
        });
    }
});
exports.getAllJobPositions = getAllJobPositions;
// Get job position by id
const getJobPositionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "Invalid job position ID",
        });
    }
    try {
        const jobPosition = yield jobPosition_1.JobPosition.findByPk(id, { include: [{ model: project_1.Project, as: 'project' }, { model: opening_1.Opening, as: 'openings_list' }] });
        if (!jobPosition) {
            return res.status(404).json({
                status: "error",
                message: "Job position not found",
            });
        }
        res.json({
            status: "success",
            message: "Job position found",
            data: jobPosition,
        });
    }
    catch (e) {
        res.status(500).json({
            status: "error",
            message: "Error fetching job position",
            error: e,
        });
    }
});
exports.getJobPositionById = getJobPositionById;
// Update a job position
const updateJobPosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "Invalid job position ID",
        });
    }
    try {
        const existingJobPosition = yield jobPosition_1.JobPosition.findByPk(id, { include: [{ model: project_1.Project, as: 'project' }] });
        if (!existingJobPosition) {
            return res
                .status(404)
                .json({ status: "error", message: "Job position not found" });
        }
        const project = yield project_1.Project.findByPk(existingJobPosition.project_id, { include: [{ model: client_1.Client, as: 'client' }] });
        if (!project) {
            return res.status(400).json({
                status: "error",
                message: "Project of JobPosition not found",
            });
        }
        const { exclusivity } = req.body;
        const demand_curation = determineDemandCuration(project.client.high_growth, exclusivity);
        yield jobPosition_1.JobPosition.update(Object.assign(Object.assign({}, req.body), { demand_curation }), { where: { id } });
        const updatedJobPosition = yield jobPosition_1.JobPosition.findByPk(id, { include: [{ model: project_1.Project, as: 'project' }, { model: opening_1.Opening, as: 'openings_list' }] });
        res.json({
            status: "success",
            message: "Job position updated",
            data: updatedJobPosition,
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({
            status: "error",
            message: "Error updating job position",
            error: e,
        });
    }
});
exports.updateJobPosition = updateJobPosition;
// Soft Delete a job position
const deleteJobPosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "Invalid job position ID",
        });
    }
    try {
        yield jobPosition_1.JobPosition.update({ activeDB: false }, { where: { id } });
        res.json({
            status: "success",
            message: "Job position deleted",
        });
    }
    catch (e) {
        res.status(500).json({
            status: "error",
            message: "Error deleting job position",
            error: e,
        });
    }
});
exports.deleteJobPosition = deleteJobPosition;
//# sourceMappingURL=jobPosition.js.map