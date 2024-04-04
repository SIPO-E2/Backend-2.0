
import { Router } from "express";
import { employeeOpeningsController } from '../controllers';

// Controllers
const {getEmployeeOpenings, getEmployeeOpening, postEmployeeOpening, updateEmployeeOpening, deleteEmployeeOpening} = employeeOpeningsController;

// Router
const router:Router = Router();


router.get('/', getEmployeeOpenings);

router.get('/:id', [
], getEmployeeOpening);

router.post('/',[
], postEmployeeOpening);

router.patch('/:id', [
], updateEmployeeOpening);

router.delete('/:id', [
], deleteEmployeeOpening);


export default router;