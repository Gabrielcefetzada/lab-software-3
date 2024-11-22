import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vantagem } from '../entities/vantagem.entity';
import { CreateVantagemDto } from '../dto/createVantagem.dto';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import { Instituicao } from 'src/modules/instituicao/entities/instituicao.entity';
import { BuyVantagemDto } from '../dto/buyVantagem.dto';
import { MailService } from 'src/modules/mail/mail.service';

@Injectable()
export class VantagemService {
  constructor(
    @InjectRepository(Vantagem)
    private readonly vantagemRepository: Repository<Vantagem>,
    @InjectRepository(Instituicao)
    private readonly instituicaoRepository: Repository<Instituicao>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly mailService: MailService
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

  async buyVantagem(buyVantagemDto: BuyVantagemDto): Promise<{ message: string }> {
    const queryRunner = this.vantagemRepository.manager.connection.createQueryRunner();
  
    await queryRunner.startTransaction();
  
    try {
      const vantagemToBeBought = await queryRunner.manager.findOne(Vantagem, {
        where: { id: buyVantagemDto.vantagem },
        relations: ['beneficiarios']
      });
  
      if (!vantagemToBeBought) {
        throw new NotFoundException('Vantagem não encontrada');
      }
  
      const user = await queryRunner.manager.findOne(Usuario, {
        where: { id: buyVantagemDto.usuario }
      });
  
      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }
  
      if (user.saldo < vantagemToBeBought.cost) {
        throw new BadRequestException('Saldo insuficiente');
      }
  
      user.saldo -= vantagemToBeBought.cost;
      await queryRunner.manager.save(Usuario, user);
  
      vantagemToBeBought.beneficiarios.push(user);
      await queryRunner.manager.save(Vantagem, vantagemToBeBought);
  
      await queryRunner.commitTransaction();

      const code = this.generateCode();

      this.mailService.sendVantagemCode(user, code, vantagemToBeBought);
      this.mailService.sendVantagemCodeToInstituicao(vantagemToBeBought.instituicao, code, user)
  
      return {
        message: 'Vantagem adquirida com sucesso. Você receberá um e-mail com o código de resgate.'
      };
  
    } catch (error) {

      await queryRunner.rollbackTransaction();

      if (error instanceof ServiceUnavailableException){
        console.log('nothing')
      } else {
        throw new BadRequestException(error.message);
      }
    } finally {
      await queryRunner.release();
    }
  }

  private generateCode() {
    return 'PROMOTIONCODE' + Math.ceil(Math.random() * 100000)
  }
}
  
