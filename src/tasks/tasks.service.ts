import { Injectable } from '@nestjs/common';
import { PrismaSqlService } from 'src/prisma-sql/prisma-sql.service';

@Injectable()
export class TasksService {
  constructor(private prismaSqlService: PrismaSqlService) {}

  async createTask(title: string, description: string, status: string, userId: string) {
    const task = await this.prismaSqlService.task.create({
      data: {
        title: title,
        description: description,
        status: status,
        userId: +userId,
      },
    });
    return { msg: 'task created' };
  }

  async updateTask(id: number, title?: string, description?: string, status?: string) {
    const task = await this.prismaSqlService.task.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        status: status,
      },
    });
    return { msg: 'task updated' };
  }

  async getUserIdForTask(taskId: number) {
    const task = await this.prismaSqlService.task.findUnique({
      where: {
        id: taskId,
      },
    });
    const userId = task?.userId;
    return userId;
  }

  async removeTask(id: number) {
    const task = await this.prismaSqlService.task.delete({
      where: { id: id },
    });
    return task;
  }

  async removeTasks(userId: number) {
    const tasks = await this.prismaSqlService.task.deleteMany({
      where: { userId: userId },
    });
    return tasks;
  }

  async getTaskListForUser(userId: string) {
    const userTasks = await this.prismaSqlService.task.findMany({
      where: {
        userId: +userId,
      },
    });

    console.log({ userTasks });

    return userTasks;
  }

  async getTaskById(taskId: string) {
    const task = await this.prismaSqlService.task.findUnique({
      where: {
        id: +taskId,
      },
    });

    console.log({ task });
    return task;
  }
}
