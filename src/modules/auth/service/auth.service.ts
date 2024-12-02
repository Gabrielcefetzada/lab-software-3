import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/modules/usuario/service/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsuarioService,
    private jwtService: JwtService,
  ) {}
  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string, userId: number }> {
    const user = await this.userService.findUserByEmail(email);
    if (!user || user.password !== password) throw new UnauthorizedException();
    const payload = { sub: user.id, username: user.email};
    return {
      access_token: await this.jwtService.signAsync(payload),
      userId: user.id
    };
  }

}
