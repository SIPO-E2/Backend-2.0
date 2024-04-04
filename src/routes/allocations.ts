// ImportacionesClient
import { Router } from "express";
import { allocationsController } from '../controllers';

// Controllers
const {getAllocations, getAllocation, postAllocation, updateAllocation, deleteAllocation} = allocationsController;

// Router
const router:Router = Router();

router.get('/', getAllocations);

router.get('/:id', [], getAllocation);

router.post('/',[], postAllocation);

router.patch('/:id', [], updateAllocation);

router.delete('/:id', [], deleteAllocation);

export default router;
