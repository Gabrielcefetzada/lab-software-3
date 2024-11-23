import {
  Controller,
  Post,
  Body,
  Logger,
  Get,
  UseGuards
} from '@nestjs/common';
import { VantagemService } from '../service/vantagem.service';
import { CreateVantagemDto } from '../dto/createVantagem.dto';
import { BuyVantagemDto } from '../dto/buyVantagem.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';

@Controller('vantagens')
export class VantagemController {
  constructor(private readonly vantagemService: VantagemService) {}

  private readonly logger = new Logger(VantagemController.name);

  @UseGuards(AuthGuard)
  @Post()
  async createVantagem(@Body() createVantagemDto: CreateVantagemDto) {
    this.logger.log('Create Vantagem');
    return await this.vantagemService.createVantagem(createVantagemDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllVantagens() {
    this.logger.log('Get all vantagens');
    return await this.vantagemService.getAllVantagens();
  }

  @UseGuards(AuthGuard)
  @Post('/buy')
  async buyVantagem(@Body() buyVantagemDto: BuyVantagemDto) {
    this.logger.log('Buy Vantagem');
    return await this.vantagemService.buyVantagem(buyVantagemDto);
  }
}
