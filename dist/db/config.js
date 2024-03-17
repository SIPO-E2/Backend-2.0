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
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("../models/user");
const client_1 = require("../models/client");
const connection = new sequelize_typescript_1.Sequelize({
    database: "sipo",
    username: "ivan",
    password: "medina",
    host: "localhost",
    port: 5432,
    dialect: 'postgres',
    models: [user_1.User, client_1.Client],
    storage: ':memory:',
});
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection.sync({ alter: true });
            console.log('Connection has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
}
exports.default = connect;
//# sourceMappingURL=config.js.map