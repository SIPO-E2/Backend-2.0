// ImportacionesClient
import { Router } from "express";
import { billingsController } from '../controllers';

// Controllers
const {getBillings, getBilling, postBilling, updateBilling, deleteBilling} = billingsController;

// Router
const router:Router = Router();

router.get('/', getBillings);

router.get('/:id', [], getBilling);

router.post('/',[], postBilling);

router.patch('/:id', [], updateBilling);

router.delete('/:id', [], deleteBilling);

export default router;
