"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
// Controllers
const { getOpenings, getOpening, createOpening, editOpening, deleteOpening } = controllers_1.openingController;
// Router
const routerOpening = (0, express_1.Router)();
routerOpening.get('/', getOpenings);
routerOpening.get('/:id', [], getOpening);
routerOpening.post('/', [], createOpening);
routerOpening.patch("/:id", [], editOpening);
routerOpening.delete('/:id', [], deleteOpening);
exports.default = routerOpening;
//# sourceMappingURL=openings.js.map