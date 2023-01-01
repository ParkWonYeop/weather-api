import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { localEntity } from 'src/entities/local.entity';
import { WeatherService } from './weather.service';
import { SelectWeatherDto, SelectAllWeatherDto } from './dto/weather.dto';
import { weatherEntity } from 'src/entities/weather.entity';
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
    const localList = await this.weatherService.getWeatherInfo(
      selectWeatherDto,
    );
    return Object.assign({
      data: localList,
      statusCode: 200,
      statusMsg: '성공',
    });
  }

  @Post('/allWeather')
  @UsePipes(ValidationPipe)
  async getAllWeatherInfo(
    @Body() selectAllWeatherDto: SelectAllWeatherDto,
  ): Promise<weatherEntity[]> {
    const localList = await this.weatherService.getAllWeatherInfo(
      selectAllWeatherDto,
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
    return Object.assign({
      data: localInfo,
      statusCode: 200,
      statusMsg: '성공',
    });
  }

  @Get('/all')
  async getAllLocalInfo(): Promise<localEntity[]> {
    const localInfo = await this.weatherService.getAllLocalInfo();
    return Object.assign({
      data: localInfo,
      statusCode: 200,
      statusMsg: '성공',
    });
  }

  @Post('/county')
  @UsePipes(ValidationPipe)
  async getCity(@Body() localDto: LocalDto): Promise<localEntity[]> {
    const cityInfo = await this.weatherService.getCityInfo(localDto);
    return Object.assign({
      data: cityInfo,
      statusCode: 200,
      statusMsg: '성공',
    });
  }

  @Post('/all')
  async getAllCity(): Promise<any> {
    const cityInfo = await this.weatherService.getAllCityInfo();
    return Object.assign({
      data: cityInfo,
      statusCode: 200,
      statusMsg: '성공',
    });
  }
}
