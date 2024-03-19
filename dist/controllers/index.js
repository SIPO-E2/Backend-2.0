"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeesController = exports.openingController = exports.projectsController = exports.jobPositionsController = exports.clientsController = exports.usersController = void 0;
const usersController = __importStar(require("./users"));
exports.usersController = usersController;
const clientsController = __importStar(require("./clients"));
exports.clientsController = clientsController;
const projectsController = __importStar(require("./projects"));
exports.projectsController = projectsController;
const jobPositionsController = __importStar(require("./jobPosition"));
exports.jobPositionsController = jobPositionsController;
const openingController = __importStar(require("./openings"));
exports.openingController = openingController;
const employeesController = __importStar(require("./employees"));
exports.employeesController = employeesController;
//# sourceMappingURL=index.js.map