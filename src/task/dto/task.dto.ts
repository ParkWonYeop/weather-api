import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class TaskDto {
  @IsNotEmpty()
  @IsNumber()
  time: number;

  @IsNotEmpty()
  @IsString()
  date: number;

  @IsNotEmpty()
  @IsNumber()
  localIdx: string;
}
