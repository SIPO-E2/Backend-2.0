
import { Router } from "express";
import { rolesController } from "../controllers";

// Controllers
const {getRoles, getRole, postRole, updateRole, deleteRole} = rolesController;

// Router
const router:Router = Router();

router.get('/', getRoles);

router.get('/:id', [
], getRole);

router.post('/',[
], postRole);

router.patch('/:id', [
], updateRole);

router.delete('/:id', [
], deleteRole);


export default router;