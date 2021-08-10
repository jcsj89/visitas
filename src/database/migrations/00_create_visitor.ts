import Knex = require('knex');

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('visitors', table => {
        table.uuid('id').primary();
        table.string('DET_NOME').nullable();
        table.string('DET_MATRICULA').nullable();
        table.string('DET_DIGITO').nullable();
        table.string('MATRICULA_DIGITO').nullable();
        table.string('INC_PROCEDENCIA').nullable();
        table.string('INC_RAIO').nullable();
        table.string('INC_CELA').nullable();
        table.string('LOCALIZACAO').nullable();
        table.string('VIS_ID').nullable();
        table.string('VIS_NOME').nullable();
        table.string('VIS_PARLATORIO').nullable();
        table.string('VIS_RG').nullable();
        table.string('VIS_CPF').nullable();
        table.string('DVI_PARENTESCO').nullable();
        table.string('VIS_DATANASCIMENTO').nullable();
        table.string('VIS_SEXO').nullable();
        table.string('VIS_VENCIMENTO').nullable();
        table.string('VIS_ENDERECO_VENC').nullable();
        table.string('VIS_ENDERECO').nullable();
        table.string('VIS_CIDADE_ID').nullable();
        table.string('ENDERECO_CIDADE').nullable();
        table.string('ENDERECO_UF').nullable();
        table.string('VIS_BLOQUEADO').nullable();
        table.string('VIS_DATACADASTRO').nullable();
        table.string('VIS_DATAALTERACAO').nullable();
        table.string('DVI_STATUS').nullable();
        table.string('VIS_OBS').nullable();
        table.string('MOVIMENTACAO_DATA').nullable();
        table.string('MOVIMENTACAO_MOTIVO').nullable();
        table.string('IDADE').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('visitors');
}
