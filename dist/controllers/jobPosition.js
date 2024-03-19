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
exports.deleteJobPosition = exports.updateJobPosition = exports.createJobPosition = exports.getJobPositionById = exports.getAllJobPositions = void 0;
const jobPosition_1 = require("../models/jobPosition");
// Get all job positions
const getAllJobPositions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // We add this so we can use the query parameters to paginate the results of the job positions
    // Example: /job-positions?from=0&limit=5
    const { from = 0, to = 5 } = req.query;
    yield jobPosition_1.JobPosition.findAll({ offset: Number(from), limit: Number(to) })
        .then((jobPosition) => {
        res.json({
            status: "success",
            message: " All job positions found",
            data: jobPosition,
        });
    })
        .catch((e) => {
        res.json({
            status: "error",
            message: "All job positions not found",
            error: e,
        });
    });
});
exports.getAllJobPositions = getAllJobPositions;
// Get job position by id
const getJobPositionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // We get the id from the request parameters, we get it from the URL
    const { id } = req.params;
    yield jobPosition_1.JobPosition.findByPk(id)
        .then((jobPosition) => {
        res.json({
            status: "success",
            message: "Job position found",
            data: jobPosition,
        });
    })
        .catch((e) => {
        res.json({
            status: "error",
            message: "Job position not found",
            error: e,
        });
    });
});
exports.getJobPositionById = getJobPositionById;
// Create a new job position
const createJobPosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // We get the data from the request body
    const { name, bill_rate, posting_type, division, skills_position, region, exclusivity, demand_curation, cross_division, image_url, } = req.body;
    // We create a new job position with the data from the request body
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
        image_url,
    })
        .then((jobPosition) => {
        res.json({
            status: "success",
            message: "Job position created",
            data: jobPosition,
        });
    })
        .catch((e) => {
        res.json({
            status: "error",
            message: "Job position not created",
            error: e,
        });
    });
});
exports.createJobPosition = createJobPosition;
// Update a job position
const updateJobPosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // We get the id from the request parameters, we get it from the URL
    const { id } = req.params;
    // ...resto do takes the rest of the properties from the request body and puts them in the variable resto
    // The ... means that we can have any number of properties in the request body and they will be put in the variable resto
    const resto = __rest(req.body, []);
    // In here we update the job position with the id from the request parameters and the resto object
    // The update method returns a promise, so we use then and catch to handle the result of the promise
    yield jobPosition_1.JobPosition.update(resto, { where: { id } })
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        // If the update is successful we get the updated job position and send it in the response
        const jobPositionUpdated = yield jobPosition_1.JobPosition.findByPk(id);
        res.json({
            status: "success",
            message: "Job position updated",
            data: jobPositionUpdated,
        });
    }))
        .catch((e) => {
        res.json({
            status: "error",
            message: "Job position not updated",
            error: e,
        });
    });
});
exports.updateJobPosition = updateJobPosition;
// Soft Delete to job position
const deleteJobPosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield jobPosition_1.JobPosition.update({ activeDB: false }, { where: { id: id } })
        .then(() => {
        res.json({
            status: "success",
            message: "Job position deleted",
            data: {
                id,
            },
        });
    })
        .catch((e) => {
        res.status(500).json({
            status: "error",
            message: "Job position not deleted",
            error: e.toString(),
        });
    });
});
exports.deleteJobPosition = deleteJobPosition;
//# sourceMappingURL=jobPosition.js.map