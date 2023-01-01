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

  async getAllWeatherInfo(selectWeatherDto): Promise<weatherEntity[]> {
    try {
      return this.weatherRepository.find(selectWeatherDto);
    } catch (err) {
      this.logger.log(err);
    }
  }

  async getAllLocalInfo(): Promise<localEntity[]> {
    try {
      const data = await this.localRepository.find();
      return data;
    } catch (err) {
      this.logger.log(err);
    }
  }

  async getLocalInfo(): Promise<localEntity[]> {
    try {
      const data = await this.localRepository
        .createQueryBuilder()
        .select('DISTINCT (County)')
        .getRawMany();
      return data;
    } catch (err) {
      this.logger.log(err);
    }
  }

  async getCityInfo(localDto): Promise<localEntity[]> {
    try {
      return await this.localRepository
        .createQueryBuilder()
        .where('county IN (:county)', { county: localDto.county })
        .getMany();
    } catch (err) {
      this.logger.log(err);
    }
  }

  async getAllCityInfo(): Promise<any> {
    try {
      return await this.localRepository.find();
    } catch (err) {
      this.logger.log(err);
    }
  }
}
