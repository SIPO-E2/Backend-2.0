// ImportacionesClient
import { Router } from "express";
import { interviewsController } from '../controllers';

// Controllers
const {getInterviews, getInterview, postInterview, updateInterview, deleteInterview} = interviewsController;

// Router
const router:Router = Router();

router.get('/', getInterviews);

router.get('/:id', [], getInterview);

router.post('/',[], postInterview);

router.patch('/:id', [], updateInterview);

router.delete('/:id', [], deleteInterview);

export default router;
