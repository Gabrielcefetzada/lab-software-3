import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../service/auth.service';
import { AuthController } from '../controller/auth.controller';
import * as dotenv from 'dotenv';
import { UsuarioModule } from 'src/modules/usuario/usuario.module';
import { UsuarioService } from 'src/modules/usuario/service/usuario.service';
dotenv.config();
@Module({
  exports: [AuthService],
  imports: [
    UsuarioModule,
    JwtModule.register({
      global: true,
      // secret: '123',
      secret: process.env.SECRET,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
