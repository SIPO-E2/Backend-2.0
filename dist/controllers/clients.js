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
exports.deleteClient = exports.putClient = exports.postClient = exports.getClient = exports.getClients = void 0;
const models_1 = require("../models");
const models_2 = require("../models");
// Getting clients
const getClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from = 0, to = 5 } = req.query;
    // DB
    yield models_1.Client.findAll({ offset: Number(from), limit: Number(to) }).then(clients => {
        res.json({
            status: "success",
            message: "Clients found",
            data: clients,
        });
    }).catch(e => {
        res.json({
            status: "error",
            message: "Clients not found",
            error: e
        });
    });
});
exports.getClients = getClients;
// Getting a client
const getClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // DB
    yield models_1.Client.findByPk(id).then(client => {
        res.json({
            status: "success",
            message: "Client found",
            data: client,
        });
    }).catch(e => {
        res.json({
            status: "error",
            message: "Client not found",
            error: e
        });
    });
});
exports.getClient = getClient;
// Creating a client
const postClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, user_id, division, details, high_growth, image } = req.body;
    // if user not found return error because the relationship is required
    const user = yield models_2.User.findByPk(user_id);
    if (!user) {
        res.json({
            status: "error",
            message: "Client User not found",
        });
        return;
    }
    yield models_1.Client.create({ name, user_id, user, division, details, high_growth, image }).then(client => {
        res.json({
            status: "success",
            message: "Client created",
            data: client,
        });
    }).catch(e => {
        res.json({
            status: "error",
            message: "Client not created",
            error: e
        });
    });
});
exports.postClient = postClient;
// Updating a client
const putClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resto = __rest(req.body, []);
    // dont update user_id
    delete resto.user_id;
    yield models_1.Client.update(resto, { where: { id } }).then(() => __awaiter(void 0, void 0, void 0, function* () {
        const updatedClient = yield models_1.Client.findByPk(id);
        res.json({
            status: "success",
            message: "Client updated",
            data: updatedClient,
        });
    })).catch(e => {
        res.json({
            status: "error",
            message: "Client not updated",
            error: e
        });
    });
});
exports.putClient = putClient;
//Delete a client(soft delete)
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield models_1.Client.update({ activeDB: false }, { where: { id } }).then(() => {
        res.json({
            status: "success",
            message: "Client deleted",
            data: {
                id
            },
        });
    }).catch(e => {
        res.json({
            status: "error",
            message: "Client not deleted",
            error: e
        });
    });
});
exports.deleteClient = deleteClient;
//# sourceMappingURL=clients.js.map