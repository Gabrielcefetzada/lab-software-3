import {
  Controller,
  Post,
  Body,
  Logger,
  UseGuards
} from '@nestjs/common';
import { TransacaoService } from '../service/transacao.service';
import { CreateTransacaoDto } from '../dto/createTransacao.dto';
import { CreateTransacaoProfessoresDto } from '../dto/createTransacaoProfessores.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';

@Controller('transacoes')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  private readonly logger = new Logger(TransacaoController.name);

  @UseGuards(AuthGuard)
  @Post()
  async createTransacao(@Body() createTransacaoDto: CreateTransacaoDto) {
    this.logger.log('Create transaction');
    return await this.transacaoService.createTransaction(createTransacaoDto);
  }

  @UseGuards(AuthGuard)
  @Post('/professor')
  async createTransacaoProfessor(@Body() createTransacaoDto: CreateTransacaoProfessoresDto) {
    this.logger.log('Create transaction for teacher');
    return await this.transacaoService.createTransactionForTeacher(createTransacaoDto);
  }
}
