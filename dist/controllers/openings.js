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
exports.deleteOpening = exports.editOpening = exports.createOpening = exports.getOpening = exports.getOpenings = void 0;
const models_1 = require("../models");
const models_2 = require("../models");
// Getting openings
const getOpenings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from = 0, to = 5 } = req.query;
    // DB
    yield models_2.Opening.findAll({ offset: Number(from), limit: Number(to), include: [{ model: models_1.JobPosition, as: "owner_jobPosition" }] })
        .then((openings) => {
        res.json({
            status: "success",
            message: "Openings found",
            data: openings,
        });
    })
        .catch((e) => {
        res.json({
            status: "error",
            message: "Openings not found",
            error: e,
        });
    });
});
exports.getOpenings = getOpenings;
// Getting a opening
const getOpening = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // DB
    yield models_2.Opening.findByPk(id, { include: [{ model: models_1.JobPosition, as: "owner_jobPosition" }] })
        .then((openings) => {
        res.json({
            status: "success",
            message: "Opening found",
            data: openings,
        });
    })
        .catch((e) => {
        res.json({
            status: "error",
            message: "Opening not found",
            error: e,
        });
    });
});
exports.getOpening = getOpening;
// Creating a opening
const createOpening = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, reason_current_status, open_date, close_date, close_reason, hours_required, owner_jobPosition_id } = req.body;
    // // if employee not found return error because the relationship is required
    // const employee = await Employee.findByPk(employee_id);
    // if (!employee) {
    //     res.json({
    //         status: "error",
    //         message: " Employee of Opening not found",
    //     });
    //     return;
    // }
    const jobPosition = yield models_1.JobPosition.findByPk(owner_jobPosition_id);
    if (!jobPosition) {
        res.json({
            status: "error",
            message: "Job position of Opening not found",
        });
        return;
    }
    yield models_2.Opening.create({ status, open_date, close_date, close_reason, hours_required, owner_jobPosition_id, reason_current_status }, { include: [{ model: models_1.JobPosition, as: "owner_jobPosition" }] }).then((opening) => __awaiter(void 0, void 0, void 0, function* () {
        const openingWithAssociations = yield models_2.Opening.findByPk(opening.id, { include: [{ model: models_1.JobPosition, as: "owner_jobPosition" }] });
        res.json({
            status: "success",
            message: "Opening created",
            data: openingWithAssociations,
        });
    })).catch(e => {
        res.json({
            status: "error",
            message: "Opening not created",
            error: e
        });
    });
});
exports.createOpening = createOpening;
// Updating a opening
const editOpening = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resto = __rest(req.body, []);
    //   dont update jobPosition_id
    //   delete resto.jobPosition_id;
    yield models_2.Opening.update(resto, { where: { id } })
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        const openingUpdated = yield models_2.Opening.findByPk(id, { include: [{ model: models_1.JobPosition, as: "owner_jobPosition" }] });
        res.json({
            status: "success",
            message: "Opening updated",
            data: openingUpdated,
        });
    }))
        .catch((e) => {
        res.json({
            status: "error",
            message: "Opening not updated",
            error: e,
        });
    });
});
exports.editOpening = editOpening;
// Deleting a opening (soft delete)
const deleteOpening = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield models_2.Opening.update({ activeDB: false }, { where: { id } })
        .then(() => {
        res.json({
            status: "success",
            message: "Opening deleted",
            data: {
                id,
            },
        });
    })
        .catch((e) => {
        res.json({
            status: "error",
            message: "Opening not deleted",
            error: e,
        });
    });
});
exports.deleteOpening = deleteOpening;
//# sourceMappingURL=openings.js.map