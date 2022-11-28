import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
//import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private readonly httpService: HttpService) {
    this.httpService = httpService;
  }

  /*@Cron('* * * * * *', { name: 'sampleTask' })
  handleCron() {
    const strings = JSON.parse(
      this.httpService.get('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=인증키&numOfRows=10&pageNo=1&base_date=20210628&base_time=0600&nx=55&ny=127'),
    );
    console.log(strings);
  }*/

  async findAll(): Promise<any> {
    const result = await this.httpService
      .get(
        'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=YieL8kJL8TuVkpYypgTGoXEZOef8iE5Xp9YlQ7qIdSQ%2Fbqla1WkjjAxDfB4VhJKsUOwMb4LsXUVA0Lf7s%2FAJQQ%3D%3D&numOfRows=10&pageNo=1&base_date=20210628&base_time=0600&nx=55&ny=127',
      )
      .toPromise();
    return result.data;
  }
}
