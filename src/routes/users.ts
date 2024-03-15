// Importaciones
import { Router } from "express";
import { usersController } from '../controllers';

// Cotrollers
const {getUsers, getUser, postUser, putUser, deleteUser} = usersController;

// Router
const router:Router = Router();


router.get('/', getUsers);

router.get('/:id', [
], getUser);

router.post('/',[
], postUser);

router.put('/:id', [
], putUser);

router.delete('/:id', [
], deleteUser);


export default router;