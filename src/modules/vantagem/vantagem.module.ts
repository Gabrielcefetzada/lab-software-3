import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VantagemService } from './service/vantagem.service';
import { Vantagem } from './entities/vantagem.entity';
import { VantagemController } from './controller/vantagem.controller';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Instituicao } from '../instituicao/entities/instituicao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vantagem, Usuario, Instituicao])],
  providers: [VantagemService],
  controllers: [VantagemController],
  exports: [VantagemService],
})
export class VantagemModule {}