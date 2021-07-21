import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import VisitaRepository from '@modules/visitas/typeorm/repositories/VisitaRepository';

export default class RolVisitasController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response | undefined> {
        const visitaRepository = getCustomRepository(VisitaRepository);
        try {
            const visitas = await visitaRepository.find();

            return response.json(visitas);
        } catch (error) {
            console.log(error);
        }
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const visitaRepository = getCustomRepository(VisitaRepository);

        const visita = await visitaRepository.findByName('jose');

        if (!visita) throw new Error('erro ao buscar visita');

        return response.json(visita);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response | undefined> {
        const visitaRepository = getCustomRepository(VisitaRepository);

        const { VIS_NOME, VIS_CPF } = request.body;

        const visita = visitaRepository.create({
            VIS_NOME,
            VIS_CPF,
        });
        try {
            await visitaRepository.save(visita);

            return response.json(visita);
        } catch (e) {
            console.log('create error controller');
        }
    }
}
