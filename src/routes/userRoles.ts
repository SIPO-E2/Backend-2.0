
import { Router } from "express";
import { userRolesController } from "../controllers";

// Controllers
const {getUserRoles, getUserRole, postUserRole, updateUserRole, deleteUserRole} = userRolesController;

// Router
const router:Router = Router();

router.get('/', getUserRoles);

router.get('/:id', [
], getUserRole);

router.post('/',[
], postUserRole);

router.patch('/:id', [
], updateUserRole);

router.delete('/:id', [
], deleteUserRole);


export default router;