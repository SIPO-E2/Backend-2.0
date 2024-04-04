
import { Router } from "express";
import { candidatesController } from '../controllers';

// Controllers
const {getCandidates, getCandidate, postCandidate, updateCandidate, deleteCandidate} = candidatesController;

// Router
const router:Router = Router();


router.get('/', getCandidates);

router.get('/:id', [
], getCandidate);

router.post('/',[
], postCandidate);

router.patch('/:id', [
], updateCandidate);

router.delete('/:id', [
], deleteCandidate);


export default router;