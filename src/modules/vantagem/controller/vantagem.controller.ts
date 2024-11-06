import {
  Controller,
  Post,
  Body,
  Logger,
  Get,
} from '@nestjs/common';
import { VantagemService } from '../service/vantagem.service';
import { CreateVantagemDto } from '../dto/createVantagem.dto';

@Controller('vantagens')
export class VantagemController {
  constructor(private readonly vantagemService: VantagemService) {}

  private readonly logger = new Logger(VantagemController.name);

  @Post()
  async createTransacao(@Body() createVantagemDto: CreateVantagemDto) {
    this.logger.log('Create Vantagem');
    return await this.vantagemService.createVantagem(createVantagemDto);
  }

  @Get()
  async getAllVantagens() {
    this.logger.log('Get all vantagens');
    return await this.vantagemService.getAllVantagens();
  }
}
