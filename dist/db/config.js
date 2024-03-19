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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("../models/user");
const client_1 = require("../models/client");
const project_1 = require("../models/project");
const jobPosition_1 = require("../models/jobPosition");
const opening_1 = require("../models/opening");
const employee_1 = require("../models/employee");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Daniela
//  daniela Abelanda22
// Uma "sisweb_user" "HDK#$%Ljkwerff.89"
// Hector   "hector" "cehn22za02"
// Camila  "camila" "tititoto"
const connection = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    models: [user_1.User, client_1.Client, project_1.Project, jobPosition_1.JobPosition, opening_1.Opening, employee_1.Employee],
    storage: ':memory:',
});
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection.sync({ alter: true });
            console.log("Connection has been established successfully.");
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    });
}
exports.default = connect;
//# sourceMappingURL=config.js.map