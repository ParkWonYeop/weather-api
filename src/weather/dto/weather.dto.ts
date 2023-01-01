import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SelectWeatherDto {
  @IsNotEmpty()
  @IsNumber()
  area: number;

  @IsNotEmpty()
  @IsNumber()
  time: number;

  @IsNotEmpty()
  @IsString()
  date: string;
}

export class SelectAllWeatherDto {
  @IsNotEmpty()
  @IsNumber()
  time: number;

  @IsNotEmpty()
  @IsString()
  date: string;
}
