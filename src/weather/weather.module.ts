import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { localEntity } from 'src/entities/local.entity';
import { weatherEntity } from 'src/entities/weather.entity';

@Module({
  imports: [TypeOrmModule.forFeature([localEntity, weatherEntity])],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
