import { Module } from '@nestjs/common';
import { InstituicaoController } from './controller/instituicao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instituicao } from './entities/instituicao.entity';
import { InstituicaoService } from './service/instituicao.service';

@Module({
  imports: [TypeOrmModule.forFeature([Instituicao])],
  providers: [InstituicaoService],
  controllers: [InstituicaoController],
  exports: [InstituicaoService],
})
export class InstituicaoModule {}
