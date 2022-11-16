import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getServerInformation(): string {
    return this.appService.getServerInformation();
  }
  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
