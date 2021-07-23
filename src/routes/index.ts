import { Router } from 'express';
const routes = Router();
import rolVisitas from '@modules/visitas/routes/rolVisitas.router';

routes.use('/visitas', rolVisitas);

export default routes;
