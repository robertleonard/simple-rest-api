import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  // Request,
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
import { UserDto } from 'src/users/dto/user.dto';
import { Request } from 'express';
import { GetTaskListDto } from './dto/get-task-list.dto';

interface TaskRequest extends Request {
  user: UserDto;
}

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // CREATE TASK
  // Creating a task
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  createTask(@Req() request: TaskRequest, @Body() body: CreateTaskDto) {
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
  async updateTask(@Param('id') taskId: number, @Body() body: UpdateTaskDto) {
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
  getTaskListForUser(@Req() request: TaskRequest, @Body() body: GetTaskListDto) {
    const user: UserDto = request.user;
    if (user.role === Role.User) {
      // get list of tasks that owns
      return this.tasksService.getTaskListForUser(request.user.id);
    }
    // get list of tasks for specified user id
    if (!body.userId) {
      return new BadRequestException('Bad userId in the body');
    }
    return this.tasksService.getTaskListForUser(+body.userId);
  }

  // GET TASK
  // - Admin can get any task
  // - User can only get a task with the same userId (he owns)
  @Get(':id')
  @UseGuards(JwtAuthGuard, CanEditTaskGuard)
  @CanEditTask()
  getTask(@Param('id') taskId: number) {
    return this.tasksService.getTaskById(+taskId);
  }
}
