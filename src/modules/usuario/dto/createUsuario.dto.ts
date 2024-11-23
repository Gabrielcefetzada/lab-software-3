import { IsNotEmpty, IsEmail } from 'class-validator';
import { Instituicao } from 'src/modules/instituicao/entities/instituicao.entity';

export class CreateUsuarioDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  rg: string;

  @IsNotEmpty()
  endereco: string;

  @IsNotEmpty()
  curso: string;

  @IsNotEmpty()
  instituicao: Instituicao;
}