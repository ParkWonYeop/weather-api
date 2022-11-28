import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { localEntity } from 'src/entities/local.entity';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {
    this.weatherService = weatherService;
  }

  @Get('/test')
  async findall(): Promise<localEntity> {
    const localList = await this.weatherService.findAll();
    return Object.assign({
      data: localList,
      statusCode: 200,
      statusMsg: '성공',
    });
  }
}
