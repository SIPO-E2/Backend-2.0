// Importaciones
import { Router } from "express";
import { clientsController } from '../controllers';

// Controllers
const {getClients, getClient, postClient, putClient, deleteClient} = clientsController;

// Router
const router:Router = Router();

router.get('/', getClients);

router.get('/:id', [], getClient);

router.post('/',[], postClient);

router.put('/:id', [], putClient);

router.delete('/:id', [], deleteClient);

export default router;
