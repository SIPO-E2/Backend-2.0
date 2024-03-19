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
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const models_1 = require("../models");
const models_2 = require("../models");
const models_3 = require("../models");
// Getting users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from = 0, to = 5 } = req.query;
    // DB
    yield models_1.User.findAll({ offset: Number(from), limit: Number(to), include: [{ model: models_2.Project, as: "projects" }, { model: models_3.Client, as: "clients" }] }).then(users => {
        res.json({
            status: "success",
            message: "Users found",
            data: users,
        });
    }).catch(e => {
        res.json({
            status: "error",
            message: "Users not found",
            error: e
        });
    });
});
exports.getUsers = getUsers;
// Getting a user
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // DB
    yield models_1.User.findByPk(id, { include: [{ model: models_2.Project, as: "projects" }, { model: models_3.Client, as: "clients" }] }).then(user => {
        res.json({
            status: "success",
            message: "User found",
            data: user,
        });
    }).catch(e => {
        res.json({
            status: "error",
            message: "User not found",
            error: e
        });
    });
});
exports.getUser = getUser;
// Creating a user
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    yield models_1.User.create({ name, email, password, role }, { include: [{ model: models_2.Project, as: "projects" }, { model: models_3.Client, as: "clients" }] }).then(user => {
        res.json({
            status: "success",
            message: "User created",
            data: user,
        });
    }).catch(e => {
        res.json({
            status: "error",
            message: "User not created",
            error: e
        });
    });
});
exports.postUser = postUser;
// Updating a user
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resto = __rest(req.body, []);
    yield models_1.User.update(resto, { where: { id } }).then(() => __awaiter(void 0, void 0, void 0, function* () {
        const updatedUser = yield models_1.User.findByPk(id, { include: [{ model: models_2.Project, as: "projects" }, { model: models_3.Client, as: "clients" }] });
        res.json({
            status: "success",
            message: "User updated",
            data: updatedUser,
        });
    })).catch(e => {
        res.json({
            status: "error",
            message: "User not updated",
            error: e
        });
    });
});
exports.putUser = putUser;
// Deleting a user (soft delete)
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield models_1.User.update({ activeDB: false }, { where: { id } }).then(() => {
        res.json({
            status: "success",
            message: "User deleted",
            data: {
                id
            },
        });
    }).catch(e => {
        res.json({
            status: "error",
            message: "User not deleted",
            error: e
        });
    });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map