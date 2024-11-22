import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Vantagem } from '../vantagem/entities/vantagem.entity';
import { Instituicao } from '../instituicao/entities/instituicao.entity';

export interface MailBaseParams {
  subject: string;
  body: string;
}
@Injectable()
export class MailService {
  private readonly logger = new Logger('Mail Service');
  constructor(
    private mailerService: MailerService,
  ) {}

  async sendVantagemCode(user: Usuario, code: string, vantagem: Vantagem) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Código de resgate de vantagem',
        template: './vantagemCode',
        context: {
          name: user.nome,
          code,
          vantagem: vantagem.nome
        },
      });

      this.logger.log(`Email de vantagemCode enviado com sucesso para  ${user.nome}`);
    } catch (err) {
      this.logger.error(
        `Email não pode ser enviado para 
        ${user.nome}.
        Motivo: 
        ${err}`,
      );

      throw new ServiceUnavailableException()
    }
  }

  async sendVantagemCodeToInstituicao(instituicao: Instituicao, code: string, student: Usuario) {
    try {
      await this.mailerService.sendMail({
        to: 'emailDaEmpresa@emailDaEmpresa.com',
        subject: 'Envio de Código de resgate de vantagem',
        template: './vantagemCodeToInstituicao',
        context: {
          instituicao: instituicao.nome,
          code,
          student: student.nome
        },
      });

      this.logger.log(`Email de sendVantagemCodeToInstituicao enviado com sucesso para  ${instituicao.nome}`);
    } catch (err) {
      this.logger.error(
        `Email não pode ser enviado para 
       a empresa.
        Motivo: 
        ${err}`,
      );

      throw new ServiceUnavailableException()
    }
  }
}
