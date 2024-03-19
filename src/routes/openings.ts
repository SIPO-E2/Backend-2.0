import { Router } from "express";
import { openingController } from '../controllers';

// Controllers
const { getOpenings, getOpening, createOpening, editOpening, deleteOpening } = openingController;

// Router
const routerOpening: Router = Router();


routerOpening.get('/', getOpenings);

routerOpening.get('/:id', [
], getOpening);

routerOpening.post('/', [
], createOpening);

routerOpening.put('/:id', [
], editOpening);

routerOpening.delete('/:id', [
], deleteOpening);


export default routerOpening;