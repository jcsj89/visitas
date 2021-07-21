import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class visita1626744949085 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'visitas',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'DET_NOME',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'DET_MATRICULA',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'DET_DIGITO',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'MATRICULA_DIGITO',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'INC_PROCEDENCIA',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'INC_RAIO',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'INC_CELA',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'LOCALIZACAO',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'VIS_ID',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'VIS_NOME',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'VIS_PARLATORIO',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'VIS_RG',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'VIS_CPF',
                        type: 'text',
                        isUnique: true,
                    },
                    {
                        name: 'DVI_PARENTESCO',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'VIS_DATANASCIMENTO',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'VIS_SEXO',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'VIS_VENCIMENTO',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'VIS_ENDERECO_VENC',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'VIS_ENDERECO',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'VIS_CIDADE_ID',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'ENDERECO_CIDADE',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'ENDERECO_UF',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'VIS_BLOQUEADO',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'VIS_DATACADASTRO',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'VIS_DATAALTERACAO',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'DVI_STATUS',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'VIS_OBS',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'MOVIMENTACAO_DATA',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'MOVIMENTACAO_MOTIVO',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'IDADE',
                        type: 'text',
                        isNullable: true,
                    },

                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('visitas');
    }
}
