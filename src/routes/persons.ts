
import { Router } from "express";
import { personsController } from '../controllers';

// Controllers
const {getPersons, getPerson, postPerson, updatePerson, deletePerson} = personsController;

// Router
const router:Router = Router();


router.get('/', getPersons);

router.get('/:id', [
], getPerson);

router.post('/',[
], postPerson);

router.patch('/:id', [
], updatePerson);

router.delete('/:id', [
], deletePerson);


export default router;