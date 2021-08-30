import { Request, Response } from 'express';
import knex from '../../../database/connection';

export default class RolVisitasController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response | void> {
        //pages names
        const home = '/';
        // rol de visitas
        const valepostal = 'valepostal';
        const vestuario = 'vestuario';
        const sedex = 'sedex';
        const mascara = 'mascara';
        const visitapresencial = 'visitapresencial';

        // advogados
        const advogado = 'advogado';
        const advatendimento = 'advatendimento';
        const auxreclusao = 'auxreclusao';
        const advtrabalhoeducacao = 'advtrabalhoeducacao';
        const advpermcarceraria = 'advpermcarceraria';

        const oficial = 'oficial';
        //delete after
        console.log(request.session);
        console.log(request.sessionID);
        console.log(request.originalUrl);

        request.session.authType = undefined;
        request.session.user = undefined;

        switch (request.originalUrl) {
            case '/valepostal':
                return response.render('index.ejs', { valepostal });
            case '/advogado':
                return response.render('index.ejs', { advogado });
            case '/oficial':
                return response.render('index.ejs', { oficial });
            case '/vestuario':
                return response.render('index.ejs', { vestuario });
            case '/sedex':
                return response.render('index.ejs', { sedex });
            case '/auxreclusao':
                return response.render('index.ejs', { auxreclusao });
            case '/mascara':
                return response.render('index.ejs', { mascara });
            case '/advatendimento':
                return response.render('index.ejs', { advatendimento });
            case '/advtrabalhoeducacao':
                return response.render('index.ejs', { advtrabalhoeducacao });
            case '/advpermcarceraria':
                return response.render('index.ejs', { advpermcarceraria });
            case '/visitapresencial':
                return response.render('index.ejs', { visitapresencial });

            default:
                return response.render('index.ejs', { home });
        }
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response | void> {
        const deleted = await knex('visitors').del();

        if (deleted > 0) {
            await request.flash('deleted', 'Tabela Visitantes Zerada.');
        }

        return response.redirect('/user/admin');
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
                'VIS_CPF',
                'DET_NOME',
                'DET_MATRICULA',
                'INC_RAIO',
                'INC_CELA',
                'VIS_BLOQUEADO',
                'VIS_OBS_DISPONIVEL',
            );

        if (visitor.length < 1) {
            //seta a flash message
            await request.flash(
                'info',
                'Caso você tenha enviado a documentação aguarde prazo de até 10 dias úteis.',
            );
            //consome a flash message, como nao vai redirecionar
            const messages = await request.consumeFlash('info');

            return response.render('index', { messages });
        }

        //visitor[0]['VIS_OBS'] = '';
        console.log(visitor);

        // FAZ A ABREVIAÇÃO DO NOME DA VISITA
        visitor[0]['VIS_NOME'] = abreviaNome(visitor[0]['VIS_NOME']);

        //incrementar consulta na tabela
        const consult = await knex('consult')
            .where({
                cpf: visitor[0]['VIS_CPF'],
            })
            .select('*');

        if (consult.length < 1) {
            const consultObj: IConsult = {
                cpf: visitor[0]['VIS_CPF'],
                quantidade: 1,
            };

            await knex('consult').insert(consultObj);
        } else {
            const cpf = visitor[0]['VIS_CPF'];
            consult[0]['quantidade']++;
            consult[0]['updated_at'] = new Date().toISOString();

            await knex('consult')
                .where({
                    cpf,
                })
                .update(consult[0]);

            console.log(consult);
        }

        return response.render('index', { visitor });
    }
}

interface IConsult {
    cpf: string;
    quantidade: number;
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

function abreviaNome(nome: string): string {
    const arrayNome = nome.split(' ');
    let nomeAbreviado = arrayNome[0];

    for (let index = 0; index < arrayNome.length; index++) {
        if (index !== 0) {
            nomeAbreviado += ' ' + arrayNome[index][0] + '.';
        }
    }

    return nomeAbreviado;
}
