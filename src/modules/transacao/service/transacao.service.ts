import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transacao } from '../entities/transacao.entity';
import { CreateTransacaoDto } from '../dto/createTransacao.dto';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import { CreateTransacaoProfessoresDto } from '../dto/createTransacaoProfessores.dto';
import { UsuarioService } from 'src/modules/usuario/service/usuario.service';

@Injectable()
export class TransacaoService {
  constructor(
    @InjectRepository(Transacao)
    private readonly transacaoRepository: Repository<Transacao>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly usuarioService: UsuarioService
    
  ) {}

  async createTransaction(createTransacaoDto: CreateTransacaoDto): Promise<Transacao> {
    try {
      const userPayer = await this.usuarioRepository.findOne({ where: { id: createTransacaoDto.pagador } });
      const userBeneficiary = await this.usuarioRepository.findOne({ where: { id: createTransacaoDto.beneficiario } });

      if (!userPayer || !userBeneficiary) {
        throw new NotFoundException('Pagador ou beneficiário não encontrado');
      }

      const isPayerProfessor = userPayer.email.endsWith('professor.com');
      const isBeneficiaryProfessor = userBeneficiary.email.endsWith('professor.com');

      if (isPayerProfessor && (isBeneficiaryProfessor || userPayer.id === userBeneficiary.id)) {
        throw new BadRequestException('Professores não podem transferir para outros professores ou para si mesmos');
      }

      if (!isPayerProfessor && userPayer.nome != "System") {
        throw new BadRequestException('Alunos não podem fazer transferência');
      }

      const transacao = this.transacaoRepository.create(
        {
          ...createTransacaoDto,
         beneficiario: await this.usuarioService.findUserById(createTransacaoDto.beneficiario),
         pagador: await this.usuarioService.findUserById(createTransacaoDto.pagador)
        });

      await this.transacaoRepository.save(transacao);

      await this.updateUserBalances(userPayer, userBeneficiary, createTransacaoDto.valor);

      return transacao;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async updateUserBalances(userPayer: Usuario, userBeneficiary: Usuario, valor: number): Promise<void> {
    if (userPayer.saldo < valor) {
      throw new BadRequestException('Saldo insuficiente para realizar a transação');
    }

    userPayer.saldo -= valor;
    await this.usuarioRepository.save(userPayer);

    userBeneficiary.saldo += valor;
    await this.usuarioRepository.save(userBeneficiary);
  }

  async createTransactionForTeacher(createTransacaoProfessoresDto: CreateTransacaoProfessoresDto): Promise<{message: string}> {
      try {

        console.log(createTransacaoProfessoresDto)
        if (createTransacaoProfessoresDto.senha !== "123") {
          throw new ForbiddenException("Senha incorreta");
        }
        
        const teachers = await this.usuarioService.findAllTeacherUsers();
        const system = await this.usuarioService.findSystemUser();
        console.log(teachers)
        console.log(system)

        for (const teacher of teachers) {
          await this.createTransaction({
            valor: 100000,
            motivo: "Moedas para distribuír aos alunos",
            beneficiario: teacher.id,
            pagador: system.id,
          });
        }

        return {
          message: "Sucesso!"
        }

      } catch (error) {
        if (error instanceof BadRequestException) {
          throw new BadRequestException(error.message);
      }
      throw error;
    }  
  } 
}
