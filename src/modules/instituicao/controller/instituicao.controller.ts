import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Logger,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CreateInstituicaoDto } from '../dto/createInstituicao.dto';
import { InstituicaoService } from '../service/instituicao.service';
import { Instituicao } from '../entities/instituicao.entity';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';

@Controller('instituicao')
export class InstituicaoController {
  constructor(private readonly instituicaoService: InstituicaoService) {}

  private readonly logger = new Logger(InstituicaoController.name);

  @UseGuards(AuthGuard)
  @Post()
  async createInstitution(@Body() createInstituicaoDto: CreateInstituicaoDto) {
    this.logger.log('Create Institution');
    return this.instituicaoService.createInstitution(createInstituicaoDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAllInstitution(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    this.logger.log('Get all institution');
    return this.instituicaoService.findAllInstitution(limit, page);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findInstitutionById(@Param('id') id: number) {
    this.logger.log('Get institution by id:', id);
    return this.instituicaoService.findInstitutionById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateInstitution(
    @Param('id') id: string,
    @Body() updateInstitutionDto: Partial<Instituicao>,
  ) {
    this.logger.log('Update institution with id:', id);
    return this.instituicaoService.updateInstitution(+id, updateInstitutionDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteInstitution(@Param('id') id: string) {
    this.logger.log('Delete institution with id:', id);
    return this.instituicaoService.deleteInstitution(+id);
  }
}
