import { Request, Response } from 'express';
import knex from '../../../database/connection';
import { stringify, v4 } from 'uuid';
import { copyFile } from 'fs';

export default class RolVisitasController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response | void> {
        //pages names
        const valepostal = 'valepostal';
        const advogado = 'advogado';
        const oficial = 'oficial';

        console.log(request.session);
        console.log(request.sessionID);

        console.log(request.originalUrl);
        request.session.authType = undefined;
        request.session.user = undefined;

        //render url based
        if (request.originalUrl === '/valepostal')
            return response.render('index', { valepostal });
        if (request.originalUrl === '/advogado')
            return response.render('index', { advogado });
        if (request.originalUrl === '/oficial')
            return response.render('index', { oficial });

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

    public async search(
        request: Request,
        response: Response,
    ): Promise<Response | void> {
        const { cpf } = request.body;

        //se a entrada for null
        if (!cpf) {
            //seta a flash message
            await request.flash('info', 'Entre com um CPF.');
            //consome a flash message, como nao vai redirecionar
            const messages = await request.consumeFlash('info');

            return response.render('index', { messages });
        }

        //se não tiver 11 caracteres
        if (cpf.length !== 11) {
            //seta a flash message
            await request.flash(
                'info',
                'Formato do CPF Inválido. Digite somente dígitos.',
            );
            //consome a flash message, como nao vai redirecionar
            const messages = await request.consumeFlash('info');

            return response.render('index', { messages });
        }

        if (!testaCPF(cpf)) {
            //seta a flash message
            await request.flash('info', 'CPF Inválido.');
            //consome a flash message, como nao vai redirecionar
            const messages = await request.consumeFlash('info');

            return response.render('index', { messages });
        }

        const visitor = await knex('visitors')
            .where({
                VIS_CPF: cpf,
            })
            .select(
                'VIS_NOME',
                'DET_NOME',
                'DET_MATRICULA',
                'INC_RAIO',
                'INC_CELA',
                'VIS_BLOQUEADO',
                'VIS_OBS',
            );

        if (visitor.length < 1) {
            return response.json({ msg: 'CPF nao encontrado.' });
        }

        //visitor[0]['VIS_OBS'] = '';
        console.log(visitor);
        return response.render('index', { visitor });
    }
}

//function for testing cpf validation
function testaCPF(strCPF: string): boolean {
    let Soma;
    let Resto;
    Soma = 0;
    if (strCPF === '00000000000') return false;
    if (strCPF === '11111111111') return false;
    if (strCPF === '22222222222') return false;
    if (strCPF === '33333333333') return false;
    if (strCPF === '44444444444') return false;
    if (strCPF === '55555555555') return false;
    if (strCPF === '66666666666') return false;
    if (strCPF === '77777777777') return false;
    if (strCPF === '88888888888') return false;
    if (strCPF === '99999999999') return false;

    for (let i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}
