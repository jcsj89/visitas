import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('visitas')
class Visita {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    DET_NOME: string;

    @Column()
    DET_MATRICULA: string;

    @Column()
    DET_DIGITO: string;

    @Column()
    MATRICULA_DIGITO: string;

    @Column()
    INC_PROCEDENCIA: string;

    @Column()
    INC_RAIO: string;

    @Column()
    INC_CELA: string;

    @Column()
    LOCALIZACAO: string;

    @Column()
    VIS_ID: string;

    @Column()
    VIS_NOME: string;

    @Column()
    VIS_PARLATORIO: string;

    @Column()
    VIS_RG: string;

    @Column()
    VIS_CPF: string;

    @Column()
    DVI_PARENTESCO: string;

    @Column()
    VIS_DATANASCIMENTO: string;

    @Column()
    VIS_SEXO: string;

    @Column()
    VIS_VENCIMENTO: string;

    @Column()
    VIS_ENDERECO_VENC: string;

    @Column()
    VIS_ENDERECO: string;

    @Column()
    VIS_CIDADE_ID: string;

    @Column()
    ENDERECO_CIDADE: string;

    @Column()
    ENDERECO_UF: string;

    @Column()
    VIS_BLOQUEADO: string;

    @Column()
    VIS_DATACADASTRO: string;

    @Column()
    VIS_DATAALTERACAO: string;

    @Column()
    DVI_STATUS: string;

    @Column()
    VIS_OBS: string;

    @Column()
    MOVIMENTACAO_DATA: string;

    @Column()
    MOVIMENTACAO_MOTIVO: string;

    @Column()
    IDADE: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Visita;
