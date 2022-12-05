import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { HttpModule } from '@nestjs/axios/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { localEntity } from 'src/entities/local.entity';
import { weatherEntity } from 'src/entities/weather.entity';

@Module({
  imports: [
    HttpModule.register({
      maxRedirects: 250,
      timeout: 300000,
    }),
    TypeOrmModule.forFeature([localEntity, weatherEntity]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
