import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { localEntity } from 'src/entities/local.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { xml2js } from 'xml-js';
import { weatherEntity } from 'src/entities/weather.entity';
import { Cron } from '@nestjs/schedule';

//import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(localEntity)
    private localRepository: Repository<localEntity>,
    @InjectRepository(weatherEntity)
    private weatherRepository: Repository<weatherEntity>,
  ) {
    this.httpService = httpService;
    this.localRepository = localRepository;
    this.weatherRepository = weatherRepository;
  }

  @Cron('20 22 * * * *', { name: 'sampleTask' })
  handleCron() {
    this.cronTask();
  }

  async startTask(taskDto): Promise<number> {
    try {
      let hour: number;

      if (taskDto.time == 0) {
        hour = 24;
      } else {
        hour = taskDto.time;
      }

      let time: string;

      if (hour > 10) {
        time = String(hour) + '00';
      } else {
        time = '0' + String(hour) + '00';
      }

      const date = taskDto.date;
      const localInfo = await this.localRepository.findOne({
        id: taskDto.localIdx,
      });

      this.getWeatherInfo(localInfo, date, time, hour);

      return 0;
    } catch (err) {
      return 1;
    }
  }

  async cronTask(): Promise<any> {
    const localInformation = await this.localRepository.find();
    const now = new Date();

    let hour = now.getHours();
    let date: string;
    let time: string;

    if (now.getDate() < 10) {
      date =
        String(now.getFullYear()) +
        String(now.getMonth() + 1) +
        '0' +
        String(now.getDate());
    } else {
      date =
        String(now.getFullYear()) +
        String(now.getMonth()) +
        String(now.getDate());
    }

    hour--;
    if (hour == 0) hour = 24;
    else if (hour == -1) hour = 23;

    if (hour <= 10) time = '0' + String(hour) + '00';
    else time = String(hour) + '00';

    localInformation.forEach(async (element) => {
      await this.getWeatherInfo(element, date, time, hour);
    });
  }

  async getWeatherInfo(element: any, date: string, time: string, hour: number) {
    try {
      const result = await this.httpService
        .get(
          'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=' +
            process.env.API_KEY +
            '&numOfRows=10&pageNo=1&base_date=' +
            date +
            '&base_time=' +
            time +
            '&nx=' +
            element.grid_x +
            '&ny=' +
            element.grid_y,
        )
        .toPromise();

      const resultJson = xml2js(result.data);

      const weatherInfo = {
        area: element.id,
        date: date,
        time: hour,
        PTY: resultJson.elements[0].elements[1].elements[1].elements[0]
          .elements[5].elements[0].text,
        REH: resultJson.elements[0].elements[1].elements[1].elements[1]
          .elements[5].elements[0].text,
        RN1: resultJson.elements[0].elements[1].elements[1].elements[2]
          .elements[5].elements[0].text,
        T1H: resultJson.elements[0].elements[1].elements[1].elements[3]
          .elements[5].elements[0].text,
        UUU: resultJson.elements[0].elements[1].elements[1].elements[4]
          .elements[5].elements[0].text,
        VEC: resultJson.elements[0].elements[1].elements[1].elements[5]
          .elements[5].elements[0].text,
        VVV: resultJson.elements[0].elements[1].elements[1].elements[6]
          .elements[5].elements[0].text,
        WSD: resultJson.elements[0].elements[1].elements[1].elements[7]
          .elements[5].elements[0].text,
      };

      const weather = this.weatherRepository.create(weatherInfo);
      await this.weatherRepository.save(weather);

      this.logger.log('success' + element.City);
    } catch (err) {
      this.logger.log(err);
    }
  }
}
