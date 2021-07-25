import { Request, Response } from 'express';
import knex from '../../../database/connection';
import { v4 } from 'uuid';

export default class RolVisitasController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response | void> {
        console.log(request.session);
        console.log(request.sessionID);
        request.session.authType = undefined;
        request.session.user = undefined;

        return response.render('index');
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response | void> {
        return response.json('create visitor controller');
    }

    public async list(
        request: Request,
        response: Response,
    ): Promise<Response | void> {
        const visitors = await knex('visitors').select('*');

        if (visitors.length < 1)
            return response.json({ msg: 'Banco de dados vazio.' });

        return response.json(visitors);
    }
}
