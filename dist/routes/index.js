"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerEmployee = exports.routerOpening = exports.routerJobPosition = exports.routerProject = exports.routerClient = exports.routerUser = void 0;
const users_1 = __importDefault(require("./users"));
exports.routerUser = users_1.default;
const clients_1 = __importDefault(require("./clients"));
exports.routerClient = clients_1.default;
const projects_js_1 = __importDefault(require("./projects.js"));
exports.routerProject = projects_js_1.default;
const jobPosition_1 = __importDefault(require("./jobPosition"));
exports.routerJobPosition = jobPosition_1.default;
const openings_js_1 = __importDefault(require("./openings.js"));
exports.routerOpening = openings_js_1.default;
const employees_1 = __importDefault(require("./employees"));
exports.routerEmployee = employees_1.default;
//# sourceMappingURL=index.js.map