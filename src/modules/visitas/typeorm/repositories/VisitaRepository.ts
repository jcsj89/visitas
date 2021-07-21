import { EntityRepository, Repository } from 'typeorm';
import Visita from '../entities/Visita';
// import Visita = require('./../entities/Visita');

@EntityRepository(Visita)
class VisitaRepository extends Repository<Visita> {
    public async findByName(name: string): Promise<Visita | undefined> {
        const visita = await this.findOne({
            where: {
                VIS_NOME: name,
            },
        });

        return visita;
    }

    public async findByCPF(cpf: string): Promise<Visita | undefined> {
        const visita = await this.findOne({
            where: {
                VIS_CPF: cpf,
            },
        });

        return visita;
    }

    public async findByStatus(status: string): Promise<Visita | undefined> {
        const visita = await this.findOne({
            where: {
                VIS_BLOQUEADO: status,
            },
        });

        return visita;
    }
}

export default VisitaRepository;
