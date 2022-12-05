import { Controller, Post } from '@nestjs/common';
import { Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiTags } from '@nestjs/swagger';
import { TaskDto } from './dto/task.dto';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/start')
  @UsePipes(ValidationPipe)
  async startTask(@Body() taskDto: TaskDto): Promise<number> {
    return await this.taskService.startTask(taskDto);
  }
}
