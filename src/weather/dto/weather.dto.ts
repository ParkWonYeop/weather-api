import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

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

export class UpdateUserDto extends PartialType(SelectWeatherDto) {}
