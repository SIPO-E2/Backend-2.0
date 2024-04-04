// ImportacionesClient
import { Router } from "express";
import { benchesController } from '../controllers';

// Controllers
const {getBenches, getBench, postBench, updateBench, deleteBench} = benchesController;

// Router
const router:Router = Router();

router.get('/', getBenches);

router.get('/:id', [], getBench);

router.post('/',[], postBench);

router.patch('/:id', [], updateBench);

router.delete('/:id', [], deleteBench);

export default router;
