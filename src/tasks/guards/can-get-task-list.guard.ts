import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TasksService } from '../tasks.service';
import { Role } from 'src/auth/enum';
import { CAN_GET_TASK_LIST } from '../decorators/can-get-task-list.decorator';
import { Request } from 'express';
import { UserDto } from 'src/users/dto/user.dto';
import { GetTaskListDto } from '../dto/get-task-list.dto';

@Injectable()
export class CanGetTaskListGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tasksService: TasksService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isProtected = this.reflector.get<boolean>(CAN_GET_TASK_LIST, context.getHandler());
    if (!isProtected) {
      return true;
    }

    const req: Request = context.switchToHttp().getRequest();
    const user: UserDto = req.user as UserDto;
    const body: GetTaskListDto = req.body as GetTaskListDto;
    const userId = body.userId;

    // console.log(__filename, 'user: ', user);
    // console.log(__filename, 'body: ', body);

    // Admins should have the task id in their body
    if (user.role === Role.Admin) {
      if (userId === undefined) {
        throw new BadRequestException('Admin requests should contain the user id in its body');
      } else {
        return true;
      }
    }

    // For basic users we only return the tasks that they own by using the user id from the token
    // so there is no need for the id in the body of the request
    return true;
  }
}
