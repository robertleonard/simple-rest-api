import { Injectable, CanActivate, ExecutionContext, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TasksService } from '../tasks.service';
import { Role } from 'src/auth/enum';
import { CAN_GET_TASK_LIST } from '../decorators/can-get-task-list.decorator';

@Injectable()
export class CanGetTaskListGuard implements CanActivate {
  constructor(private reflector: Reflector, private tasksService: TasksService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> 
  {
    console.log("CanGetTaskListGuard")
    const isProtected = this.reflector.get<boolean>(CAN_GET_TASK_LIST, context.getHandler());
    if (!isProtected) return true;

    const req = context.switchToHttp().getRequest();

    console.log(req)
    
    const user = req.user;
    console.log(user)
    const userId = req.body.userId;
    console.log(userId)

    // Admins should have the task id in their body
    if (user.role === Role.Admin)
        if(userId == undefined)
            throw new BadRequestException('Admin requests should contain the user id in its body')
        else return true;
    
    // For basic users we only return the tasks that they own by using the user id from the token 
    // so there is no need for the id in the body of the request
    return true;
  }
}