/* eslint-disable no-prototype-builtins */
import { Request, Response } from 'express';
import knex from '../../../database/connection';
import bcrypt from 'bcrypt';
import { assyncToJson } from '../../importExcel/importExcel';
import { v4 } from 'uuid';
import fs from 'fs';

interface IUser {
    id: string;
    email: string;
    password_hash: string;
}

export default class UserController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response | void> {
        request.session.user = undefined;
        request.session.authType = undefined;
        console.log(request.session);
        console.log(request.sessionID);
        return response.render('login');
    }

    public async login(
        request: Request,
        response: Response,
    ): Promise<Response | void> {
        const { email, password } = request.body;

        const user = await knex('users')
            .where({
                email,
            })
            .select('*');

        if (user.length < 1) {
            //seta a flash message
            await request.flash('info', 'Email ou senha incorretos.');
            //consome a flash message, como nao vai redirecionar
            const messages = await request.consumeFlash('info');

            return response.render('login', { messages });
        }

        //compara senha com hash
        const match = await bcrypt.compare(password, user[0].password_hash);
        if (!match) {
            //seta a flash message
            await request.flash('info', 'Email ou senha incorretos.');
            //consome a flash message, como nao vai redirecionar
            const messages = await request.consumeFlash('info');

            return response.render('login', { messages });
        }

        //seta o id do usuario na sessao
        request.session.user = user[0].id;
        request.session.authType = process.env.SESSION_AUTHTYPE;

        return response.redirect('/user/admin');
    }

    public async list(
        request: Request,
        response: Response,
    ): Promise<Response | void> {
        const users = await knex.select().table('users');

        return response.json(users);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response | void> {
        const { email, password_confirm, password } = request.body;

        // verifica se os campos foram preenchidos
        if (!email || !password_confirm || !password) {
            return response.status(404).json('Erro ao criar usuario.');
        }

        //verifica se as senhas são iguais
        if (password !== password_confirm)
            return response.status(404).json('Password does not equals.');

        //verifica no banco se email já é cadastrado
        const hasEmail = await knex('users')
            .where({
                email,
            })
            .select('id');

        if (hasEmail.length > 0)
            return response.status(404).json('Email já cadastrado.');

        const password_hash = await bcrypt.hash(password, 8);

        const user: IUser = {
            id: v4(),
            email,
            password_hash,
        };

        await knex('users').insert(user);

        return response.json(user);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response | void> {
        const { id } = request.params;
        const user = await knex('users').where('id', id).del();

        return response.json({
            message: 'User deleted',
        });
    }

    public async logout(
        request: Request,
        response: Response,
    ): Promise<Response | void> {
        request.session.destroy(function (err) {
            response.redirect('/');
        });
    }

    public async admin(
        request: Request,
        response: Response,
    ): Promise<Response | void> {
        console.log(request.session);
        console.log(request.sessionID);
        return response.render('admin/admin');
    }

    public async upload(
        request: Request,
        response: Response,
    ): Promise<Response | void> {
        console.log('controler file:', request.file);
        const inputPath = request.file?.path || '';
        console.log('controler', inputPath);
        const outputPath = 'uploads/upload.json';
        console.log('controler', outputPath);
        const changes: IChanges = { update: 0, save: 0, del: 0 };

        //if no file uploaded
        //05.08.21 - casa
        if (!request.file) {
            ///continuar aqui
            const message = 'nenhum upload';
            return response.render('admin/admin', { message });
        }

        //transforma excel em json
        //you miss a input file
        await assyncToJson(inputPath, outputPath);
        console.log('controler assynctojson');
        //faz a leitura do arquivo .json com os dados
        const readPath = await fs.promises.readFile(outputPath, 'utf8');

        //transforma em um array de objetos (json) os dados
        const visitorJson = JSON.parse(readPath);

        /**
         * Itera no array para verificar se deve atualizar
         * ou salvar os dados. Regras lógica abaixo:
         * - DET_MATRICULA é um campo que nunca está em branco, não precisa verificar
         * - Checa se tem cpf (VIS_CPF) cadastrado e localizacao, caso tenha,
         *   procura no banco pela matricula e cpf, se encontrar atualiza, senão
         *  insere novo visitor no banco.
         */
        for (let i = 0; i < visitorJson.length; i++) {
            //limpa o banco com localizacao em branco
            if (!visitorJson[i]['LOCALIZACAO']) {
                await knex('visitors')
                    .where({
                        DET_MATRICULA: visitorJson[i].DET_MATRICULA,
                    })
                    .del();
                changes.del++;
            }

            //atualiza ou salva
            if (visitorJson[i]['VIS_CPF'] && visitorJson[i]['LOCALIZACAO']) {
                await saveOrUpdate(visitorJson[i], changes);
            }
        }
        console.log(changes);

        //deleta todos arquivos da pasta uploads apos o uso
        delFiles();
        return response.json(changes);
    }
}

async function saveOrUpdate(visitor: IVisitor, changes: IChanges) {
    const hasVisitor = await knex('visitors')
        .where({
            VIS_CPF: visitor.VIS_CPF,
            DET_MATRICULA: visitor.DET_MATRICULA,
        })
        .select('*');

    if (hasVisitor.length === 1) {
        await knex('visitors')
            .where({
                id: hasVisitor[0]['id'],
            })
            .update({
                INC_RAIO: visitor.INC_RAIO,
                INC_CELA: visitor.INC_CELA,
                LOCALIZACAO: visitor.LOCALIZACAO,
                DVI_STATUS: visitor.DVI_STATUS,
                VIS_BLOQUEADO: visitor.VIS_BLOQUEADO,
                VIS_PARLATORIO: visitor.VIS_PARLATORIO,
                VIS_RG: visitor.VIS_RG,
                VIS_VENCIMENTO: visitor.VIS_VENCIMENTO,
                VIS_ENDERECO_VENC: visitor.VIS_ENDERECO_VENC,
                VIS_DATAALTERACAO: visitor.VIS_DATAALTERACAO,
                VIS_OBS: visitor.VIS_OBS,
                IDADE: visitor.IDADE,
            });
        changes.update++;
    }

    if (hasVisitor.length < 1) {
        visitor['id'] = v4();
        await knex('visitors').insert(visitor);
        changes.save++;
    }
}

function delFiles() {
    const files = fs.readdirSync('uploads/');

    for (const key of files) {
        if (fs.statSync('uploads/' + key)) {
            console.log('user controller:', 'deletado:', key);
            fs.unlinkSync('uploads/' + key);
        }
    }
}

interface IChanges {
    update: number;
    save: number;
    del: number;
}
interface IVisitor {
    id: string;
    DET_NOME: string;
    DET_MATRICULA: string;
    DET_DIGITO: string;
    MATRICULA_DIGITO: string;
    INC_PROCEDENCIA: string;
    INC_RAIO: string;
    INC_CELA: string;
    LOCALIZACAO: string;
    VIS_ID: string;
    VIS_NOME: string;
    VIS_PARLATORIO: string;
    VIS_RG: string;
    VIS_CPF: string;
    DVI_PARENTESCO: string;
    VIS_DATANASCIMENTO: string;
    VIS_SEXO: string;
    VIS_VENCIMENTO: string;
    VIS_ENDERECO_VENC: string;
    VIS_ENDERECO: string;
    VIS_CIDADE_ID: string;
    ENDERECO_CIDADE: string;
    ENDERECO_UF: string;
    VIS_BLOQUEADO: string;
    VIS_DATACADASTRO: string;
    VIS_DATAALTERACAO: string;
    DVI_STATUS: string;
    VIS_OBS: string;
    MOVIMENTACAO_DATA: string;
    MOVIMENTACAO_MOTIVO: string;
    IDADE: string;
}
