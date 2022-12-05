import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherModule } from './weather/weather.module';
import { TaskModule } from './task/task.module';
import { WinstonModule, utilities } from 'nest-winston';
import * as moment from 'moment';
import * as winston from 'winston';
import ormconfig from './ormconfig';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    WeatherModule,
    TaskModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: 'info',
        }),
        new winston.transports.File({
          dirname: `./log/${moment(new Date()).format('YYYY-MM-DD')}`,
          filename: 'history.log',
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
