import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  @IsNumber()
  time: number;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  localIdx: number;
}
