// ImportacionesClient
import { Router } from "express";
import { pipelinesController } from '../controllers';

// Controllers
const {getPipelines, getPipeline, postPipeline, updatePipeline, deletePipeline} = pipelinesController;

// Router
const router:Router = Router();

router.get('/', getPipelines);

router.get('/:id', [], getPipeline);

router.post('/',[], postPipeline);

router.patch('/:id', [], updatePipeline);

router.delete('/:id', [], deletePipeline);

export default router;
