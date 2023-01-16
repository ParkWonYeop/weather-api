import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerInformation(): string {
    return Object.assign({
      serverName: 'WeatherInformation',
      serverType: 'RestApi',
      serverDeveloper: 'WonyeopPark',
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
