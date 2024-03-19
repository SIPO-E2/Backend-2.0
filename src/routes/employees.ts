
import { Router } from "express";
import { employeesController } from '../controllers';

// Controllers
const {getEmployees, getEmployee, postEmployee, putEmployee, deleteEmployee} = employeesController;

// Router
const router:Router = Router();


router.get('/', getEmployees);

router.get('/:id', [
], getEmployee);

router.post('/',[
], postEmployee);

router.patch('/:id', [
], putEmployee);

router.delete('/:id', [
], deleteEmployee);


export default router;