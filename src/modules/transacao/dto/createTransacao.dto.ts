import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransacaoDto {
  @IsNotEmpty()
  pagador: number;

  @IsNotEmpty()
  beneficiario: number;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsNotEmpty()
  @IsString()
  motivo: string;
}
