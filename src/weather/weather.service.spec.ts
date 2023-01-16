import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { weatherEntity } from '../entities/weather.entity';
import { localEntity } from '../entities/local.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(ormconfig),
        TypeOrmModule.forFeature([localEntity, weatherEntity]),
      ],
      providers: [WeatherService],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be localEntity', () => {
    const result = service.getAllLocalInfo();
    expect(result).toBeInstanceOf(localEntity);
  });
});
