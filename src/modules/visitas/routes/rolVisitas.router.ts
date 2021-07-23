import { Router } from 'express';
//import { tojson } from '@modules/importExcel/importExcel';
const rolStatusRoutes = Router();
import RolVisitasController from '@modules/visitas/controllers/RolVisitasController';

const rolVisitasController = new RolVisitasController();

rolStatusRoutes.get('/', rolVisitasController.index);
// rolStatusRoutes.post('/show', rolVisitasController.show);
// rolStatusRoutes.post('/create', rolVisitasController.create);

export default rolStatusRoutes;
