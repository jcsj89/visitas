import { Router } from 'express';
const rolStatusRoutes = Router();
import RolVisitasController from '../controllers/RolVisitasController';

const rolVisitasController = new RolVisitasController();

//routes to pages
rolStatusRoutes.get('/', rolVisitasController.index);
// routes to ROL DE VISITAS
rolStatusRoutes.get('/valepostal', rolVisitasController.index);
rolStatusRoutes.get('/vestuario', rolVisitasController.index);
rolStatusRoutes.get('/sedex', rolVisitasController.index);
// routes to ADVOGADO
rolStatusRoutes.get('/advogado', rolVisitasController.index);
rolStatusRoutes.get('/advatendimento', rolVisitasController.index);
rolStatusRoutes.get('/auxreclusao', rolVisitasController.index);
rolStatusRoutes.get('/advtrabalhoeducacao', rolVisitasController.index);
rolStatusRoutes.get('/advpermcarceraria', rolVisitasController.index);

rolStatusRoutes.get('/oficial', rolVisitasController.index);

rolStatusRoutes.get('/mascara', rolVisitasController.index);

//routes to search visitor
rolStatusRoutes.post('/visitas/status', rolVisitasController.search);
rolStatusRoutes.get('/visitas/list', rolVisitasController.list);

export default rolStatusRoutes;
