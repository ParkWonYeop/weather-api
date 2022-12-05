import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { localEntity } from 'src/entities/local.entity';
import { WeatherService } from './weather.service';
import { SelectWeatherDto } from './dto/weather.dto';
import { weatherEntity } from 'src/entities/weather.entity';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {
    this.weatherService = weatherService;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async getWeatherInfo(
    @Body() selectWeatherDto: SelectWeatherDto,
  ): Promise<weatherEntity> {
    const localList = await this.weatherService.getWeatherInfo(
      selectWeatherDto,
    );
    return Object.assign({
      data: localList,
      statusCode: 200,
      statusMsg: '성공',
    });
  }

  @Get()
  async getLocalInfo(): Promise<localEntity[]> {
    const localInfo = await this.weatherService.getLocalInfo();
    return Object.assign({ localInfo });
  }
}
