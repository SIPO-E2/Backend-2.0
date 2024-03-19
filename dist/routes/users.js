"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
// Controllers
const { getUsers, getUser, postUser, putUser, deleteUser } = controllers_1.usersController;
// Router
const router = (0, express_1.Router)();
router.get('/', getUsers);
router.get('/:id', [], getUser);
router.post('/', [], postUser);
router.put('/:id', [], putUser);
router.delete('/:id', [], deleteUser);
exports.default = router;
//# sourceMappingURL=users.js.map