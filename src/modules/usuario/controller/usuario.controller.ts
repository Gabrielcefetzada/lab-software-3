import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../entities/usuario.entity';
import { CreateUsuarioDto } from '../dto/createUsuario.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  private readonly logger = new Logger(UsuarioController.name);

  @UseGuards(AuthGuard)
  @Post()
  async createUser(@Body() createUserDto: CreateUsuarioDto) {
    this.logger.log('Create user');
    return this.usuarioService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    this.logger.log('Get all users');
    return this.usuarioService.findAllUsers(limit, page);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    this.logger.log('Get user by id:', id);
    return this.usuarioService.findUserById(+id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<Usuario>,
  ) {
    this.logger.log('Update user with id:', id);
    return this.usuarioService.updateUser(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    this.logger.log('Delete user with id:', id);
    return this.usuarioService.deleteUser(+id);
  }

  @UseGuards(AuthGuard)
  @Get('extrato/:id')
  async getUserTransactions(@Param('id') id: string) {
    this.logger.log('getUserTransactions by id:', id);
    return this.usuarioService.getUserTransactions(+id);
  }

  @UseGuards(AuthGuard)
  @Get('balance/:id')
  async getUserBalance(@Param('id') id: string) {
    this.logger.log('getUserBalance by id:', id);
    return this.usuarioService.getUserBalance(+id);
  }
}
