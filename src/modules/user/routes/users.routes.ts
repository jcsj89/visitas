import { Router } from 'express';
const usersRoutes = Router();
import UserController from '../controllers/UserController'; //import UserController
import { upload } from '@src/config/multer';

//instance controller
const userControler = new UserController();

//middleware user authenticated
import { authenticated } from '@src/middlewares/authenticated';

usersRoutes.get('/', userControler.index); // render login page
usersRoutes.post('/login', userControler.login); //faz login com email/pass
usersRoutes.post('/create', userControler.create); //quando for em producao colocar authenticated
usersRoutes.get('/list', authenticated, userControler.list);
usersRoutes.get('/delete/:id', authenticated, userControler.delete);
usersRoutes.get('/logout', userControler.logout);

//routes admin
usersRoutes.get('/admin', authenticated, userControler.admin);
usersRoutes.post(
    '/admin/upload',
    upload.single('file'),
    authenticated,
    userControler.upload,
);

export default usersRoutes;
