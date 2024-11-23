import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post()
  async signIn(
    @Body() body: { password: string; email: string },
  ): Promise<{ access_token: string }> {
    return this.authService.signIn(body.email, body.password);
  }
}
