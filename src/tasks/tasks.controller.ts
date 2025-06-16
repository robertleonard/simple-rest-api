import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Role } from 'src/auth/enum/roles.enum';
import { CanEditTask } from './decorators/can-edit-task.decorator';
import { CanEditTaskGuard } from './guards/can-edit-task.guard';
import { CanGetTaskListGuard } from './guards/can-get-task-list.guard';
import { CanGetTaskList } from './decorators/can-get-task-list.decorator';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // CREATE TASK
  // Creating a task
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  createTask(@Request() request, @Body() body: CreateTaskDto) {
    return this.tasksService.createTask(
      body.title,
      body.description ? body.description : '',
      body.status,
      request.user.id,
    );
  }

  // UPDATE TASK
  // - Admin can edit any task
  // - User can only edit a task that he owns
  @Patch('update/:id')
  @UseGuards(JwtAuthGuard, CanEditTaskGuard)
  @UsePipes(new ValidationPipe())
  @CanEditTask()
  async updateTask(@Param('id') taskId: string, @Request() request, @Body() body: UpdateTaskDto) {
    return this.tasksService.updateTask(+taskId, body.title, body.description, body.status);
  }

  // REMOVE TASK
  // - Admin can remove any task
  // - User can only remove a task that he owns
  @Delete(':id')
  @UseGuards(JwtAuthGuard, CanEditTaskGuard)
  @CanEditTask()
  removeTask(@Param('id') taskId: string) {
    return this.tasksService.removeTask(+taskId);
  }

  // GET TASK LIST
  @Get('task-list')
  @UseGuards(JwtAuthGuard, CanGetTaskListGuard)
  @CanGetTaskList()
  getTaskListForUser(@Request() request, @Body() body) {
    if (request.user.role == Role.User) {
      // get list of tasks that owns
      return this.tasksService.getTaskListForUser(request.user.id);
    }
    // get list of tasks for specified user id
    return this.tasksService.getTaskListForUser(body.userId);
  }

  // GET TASK
  // - Admin can get any task
  // - User can only get a task with the same userId (he owns)
  @Get(':id')
  @UseGuards(JwtAuthGuard, CanEditTaskGuard)
  @CanEditTask()
  getTask(@Param('id') taskId) {
    return this.tasksService.getTaskById(taskId);
  }
}
