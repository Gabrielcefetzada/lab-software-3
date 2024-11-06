import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVantagemDto {
  @IsNotEmpty()
  @IsNumber()
  instituicao: number;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  cost: number;
}