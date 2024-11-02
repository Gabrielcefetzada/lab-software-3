import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransacaoService } from './service/transacao.service';
import { Transacao } from './entities/transacao.entity';
import { TransacaoController } from './controller/transacao.controller';
import { Usuario } from '../usuario/entities/usuario.entity';
import { UsuarioService } from '../usuario/service/usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transacao, Usuario])],
  providers: [TransacaoService, UsuarioService],
  controllers: [TransacaoController],
  exports: [TransacaoService, UsuarioService],
})
export class TransacaoModule {}
