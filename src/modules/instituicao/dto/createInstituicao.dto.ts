import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateInstituicaoDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(14)
  cnpj: string;
}
