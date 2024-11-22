import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'leonel.gislason6@ethereal.email',
          pass: 'BCtwa84EXzmgnTctQ7',
        },
      },
      defaults: {
        from: 'Lab03',
      },
      template: {
        dir: join(__dirname, '..', '..', 'modules', 'mail', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },      
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

