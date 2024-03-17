import { Router } from "express";
import { employeesController } from '../controllers';
//import { getemployee } from "../controllers/employeesController";

// Controllers
const {getAllEmployees, getEmployeeById, postEmployee, putEmployee, deleteEmployee} = employeesController;

// Router
const router:Router = Router();


router.get('/', getAllEmployees);

router.get('/:id', [
], getEmployeeById);

router.post('/',[
], postEmployee);

router.put('/:id', [
], putEmployee);

router.delete('/:id', [
], deleteEmployee);


export default router;
