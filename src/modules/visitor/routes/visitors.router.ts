import { Router } from 'express';
const rolStatusRoutes = Router();
import RolVisitasController from '@modules/visitor/controllers/RolVisitasController';

const rolVisitasController = new RolVisitasController();

rolStatusRoutes.get('/', rolVisitasController.index);
rolStatusRoutes.get('/visitas/list', rolVisitasController.list);

export default rolStatusRoutes;
