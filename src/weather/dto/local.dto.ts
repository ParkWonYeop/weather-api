import { IsString } from 'class-validator';

export class LocalDto {
  @IsString()
  county: string;
}
