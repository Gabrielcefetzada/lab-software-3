import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransacaoProfessoresDto {
  @IsNotEmpty()
  senha: string
}
