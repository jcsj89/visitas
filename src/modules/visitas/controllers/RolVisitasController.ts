import { Request, Response } from 'express';
import knex from '../../../database/connection';
import { jsonObj, outputFile } from '../../importExcel/importExcel';
import { v4 } from 'uuid';

export default class RolVisitasController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response | void> {
        return response.render('index', { teste: 'teste2' });
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response | void> {
        const visitors = await knex('visitors').select('*');

        if (visitors.length < 1)
            return response.json({ msg: 'Banco de dados vazio.' });

        const tipo: any[] = jsonObj(outputFile);

        for (let i = 0; i < tipo.length; i++) {
            tipo[i]['id'] = v4();
        }
        //await knex('visitors').insert(tipo);
    }
}
