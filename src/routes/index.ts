import { Router } from 'express';
const routes = Router();

//importation routes
import visitorRoutes from '../modules/visitor/routes/visitors.router';
import userRoutes from '../modules/user/routes/users.routes';

routes.use('/', visitorRoutes);
routes.use('/user', userRoutes);

export default routes;
