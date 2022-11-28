import { Controller, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/start')
  startTask() {
    return this.taskService.findAll();
  }
}
