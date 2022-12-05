import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { localEntity } from 'src/entities/local.entity';
import { weatherEntity } from 'src/entities/weather.entity';
import { Repository } from 'typeorm/index';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  constructor(
    @InjectRepository(localEntity)
    private localRepository: Repository<localEntity>,
    @InjectRepository(weatherEntity)
    private weatherRepository: Repository<weatherEntity>,
  ) {
    this.localRepository = localRepository;
    this.weatherRepository = weatherRepository;
  }

  async getWeatherInfo(selectWeatherDto): Promise<weatherEntity> {
    try {
      return this.weatherRepository.findOne(selectWeatherDto);
    } catch (err) {
      this.logger.log(err);
    }
  }

  async getLocalInfo(): Promise<localEntity[]> {
    try {
      return await this.localRepository.find();
    } catch (err) {
      this.logger.log(err);
    }
  }
}
