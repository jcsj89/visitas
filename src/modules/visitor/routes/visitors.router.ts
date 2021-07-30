import { Router } from 'express';
const rolStatusRoutes = Router();
import RolVisitasController from '@modules/visitor/controllers/RolVisitasController';

const rolVisitasController = new RolVisitasController();

//routes to pages
rolStatusRoutes.get('/', rolVisitasController.index);
rolStatusRoutes.get('/valepostal', rolVisitasController.index);
rolStatusRoutes.get('/advogado', rolVisitasController.index);
rolStatusRoutes.get('/oficial', rolVisitasController.index);

//routes to search visitor
rolStatusRoutes.post('/visitas/status', rolVisitasController.search);
rolStatusRoutes.get('/visitas/list', rolVisitasController.list);

export default rolStatusRoutes;
