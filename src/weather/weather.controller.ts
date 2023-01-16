import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { localEntity } from '../entities/local.entity';
import { WeatherService } from './weather.service';
import { SelectWeatherDto, SelectAllWeatherDto } from './dto/weather.dto';
import { weatherEntity } from '../entities/weather.entity';
import { LocalDto } from './dto/local.dto';

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
    return await this.weatherService.getWeatherInfo(selectWeatherDto);
  }

  @Post('/allWeather')
  @UsePipes(ValidationPipe)
  async getAllWeatherInfo(
    @Body() selectAllWeatherDto: SelectAllWeatherDto,
  ): Promise<weatherEntity[]> {
    return await this.weatherService.getAllWeatherInfo(selectAllWeatherDto);
  }

  @Get()
  async getLocalInfo(): Promise<localEntity[]> {
    return await this.weatherService.getLocalInfo();
  }

  @Get('/all')
  async getAllLocalInfo(): Promise<localEntity[]> {
    return await this.weatherService.getAllLocalInfo();
  }

  @Post('/county')
  @UsePipes(ValidationPipe)
  async getCity(@Body() localDto: LocalDto): Promise<localEntity[]> {
    return await this.weatherService.getCityInfo(localDto);
  }

  @Post('/all')
  async getAllCity(): Promise<localEntity> {
    return await this.weatherService.getAllCityInfo();
  }
}
