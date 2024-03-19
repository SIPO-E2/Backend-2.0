"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importaciones
const express_1 = require("express");
const controllers_1 = require("../controllers");
// Controllers
const { getClients, getClient, postClient, updateClient, deleteClient } = controllers_1.clientsController;
// Router
const router = (0, express_1.Router)();
router.get('/', getClients);
router.get('/:id', [], getClient);
router.post('/', [], postClient);
router.patch('/:id', [], updateClient);
router.delete('/:id', [], deleteClient);
exports.default = router;
//# sourceMappingURL=clients.js.map