import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BuyVantagemDto {
  @IsNotEmpty()
  @IsNumber()
  vantagem: number;

  @IsNotEmpty()
  @IsNumber()
  usuario: number;
}