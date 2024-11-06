import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vantagem } from '../entities/vantagem.entity';
import { CreateVantagemDto } from '../dto/createVantagem.dto';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import { Instituicao } from 'src/modules/instituicao/entities/instituicao.entity';

@Injectable()
export class VantagemService {
  constructor(
    @InjectRepository(Vantagem)
    private readonly vantagemRepository: Repository<Vantagem>,
    @InjectRepository(Instituicao)
    private readonly instituicaoRepository: Repository<Instituicao>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async createVantagem(createVantagemDto: CreateVantagemDto): Promise<Vantagem> {
    try {
      const { instituicao, nome, cost } = createVantagemDto;

      const instituicaoEntity = await this.instituicaoRepository.findOne({
        where: { id: instituicao },
      });
      if (!instituicaoEntity) {
        throw new BadRequestException('Instituição não encontrada');
      }


      const novaVantagem = this.vantagemRepository.create({
        instituicao: instituicaoEntity,
        nome,
        cost,
      });

      return await this.vantagemRepository.save(novaVantagem);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllVantagens(): Promise<Vantagem[]> {
    try {
      return await this.vantagemRepository.find({
        relations: ['beneficiarios'],
      });    
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
