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
exports.deleteOpening = exports.editOpening = exports.createOpening = exports.getOpening = exports.getOpenings = void 0;
const opening_1 = require("../models/opening");
// Getting openings
const getOpenings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from = 0, to = 5 } = req.query;
    // DB
    yield opening_1.Opening.findAll({ offset: Number(from), limit: Number(to) }).then(openings => {
        res.json({
            status: "success",
            message: "Openings found",
            data: openings,
        });
    }).catch(e => {
        res.json({
            status: "error",
            message: "Openings not found",
            error: e
        });
    });
});
exports.getOpenings = getOpenings;
// Getting a opening
const getOpening = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // DB
    yield opening_1.Opening.findByPk(id).then(openings => {
        res.json({
            status: "success",
            message: "Opening found",
            data: openings,
        });
    }).catch(e => {
        res.json({
            status: "error",
            message: "Opening not found",
            error: e
        });
    });
});
exports.getOpening = getOpening;
// Creating a opening
const createOpening = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status_opening, open_date, close_date, close_reason, hours_required } = req.body;
    yield opening_1.Opening.create({ status_opening, open_date, close_date, close_reason, hours_required }).then(opening => {
        res.json({
            status: "success",
            message: "Opening created",
            data: opening,
        });
    }).catch(e => {
        res.json({
            status: "error",
            message: "Opening not created",
            error: e
        });
    });
});
exports.createOpening = createOpening;
// Updating a user
const editOpening = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield opening_1.Opening.update(Object.assign({}, req.body), { where: { id } }).then(() => __awaiter(void 0, void 0, void 0, function* () {
        const openingUpdated = yield opening_1.Opening.findByPk(id);
        res.json({
            status: "success",
            message: "Opening updated",
            data: openingUpdated,
        });
    })).catch(e => {
        res.json({
            status: "error",
            message: "Opening not updated",
            error: e
        });
    });
});
exports.editOpening = editOpening;
// export const seePostulates = async (req: Request, res: Response) => {
// }
// Deleting a user (soft delete)
const deleteOpening = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield opening_1.Opening.update({ activeDB: false }, { where: { id } }).then(() => {
        res.json({
            status: "success",
            message: "Opening deleted",
            data: {
                id
            },
        });
    }).catch(e => {
        res.json({
            status: "error",
            message: "Opening not deleted",
            error: e
        });
    });
});
exports.deleteOpening = deleteOpening;
//# sourceMappingURL=openings.js.map