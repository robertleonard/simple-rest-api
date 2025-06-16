import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CAN_EDIT_TASK } from '../decorators/can-edit-task.decorator';
import { TasksService } from '../tasks.service';
import { Role } from 'src/auth/enum';
import { Request } from 'express';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class CanEditTaskGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tasksService: TasksService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('CanEditTaskGuard');
    const isProtected = this.reflector.get<boolean>(CAN_EDIT_TASK, context.getHandler());
    if (!isProtected) return true;

    const req: Request = context.switchToHttp().getRequest();
    const user: UserDto = req.user as UserDto;
    const taskId = req.params.id;

    const taskOwnerId = await this.tasksService.getUserIdForTask(+taskId);

    if (!taskOwnerId) throw new ForbiddenException('Task not found');

    // Admins can edit everything
    if (user.role === Role.Admin) return true;

    // Only owner can edit
    console.log(taskOwnerId, user.id);
    if (taskOwnerId === user.id) return true;

    throw new ForbiddenException('You cannot edit this task');
  }
}
