import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/roles.enum';
import { CanEditTask } from './decorators/can-edit-task.decorator';
import { CanEditTaskGuard } from './guards/can-edit-task.guard';
import { CanGetTaskListGuard } from './guards/can-get-task-list.guard';
import { CanGetTaskList } from './decorators/can-get-task-list.decorator';
// import { Task } from 'generated/prisma';

@Controller('tasks')
export class TasksController 
{
    constructor(private tasksService : TasksService) {};


    // @UseGuards(AuthGuard('jwt'))
    @Post('create')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    // use a Data Transfer Object to get the body from the http request 
    createTask(
        @Request() request,
        // @Body() body
        @Body() body: CreateTaskDto
    )
    {
        console.log( { body: body }) 
        console.log( { user: request.user})

        return this.tasksService.createTask(body.title, body.description ? body.description  : "", body.status, request.user.id);
        
    }

    
    @Patch('update/:id')
    @UseGuards(JwtAuthGuard, /*RolesGuard,*/ CanEditTaskGuard)
    @UsePipes(new ValidationPipe())
    // @Roles(Role.Admin) // ✅ Only admin role can access
    @CanEditTask()
    async updateTask(
        @Param('id') taskId: string,
        @Request() request,
        // @Body() body
        @Body() body : UpdateTaskDto
    )
    {
        console.log(taskId)
        console.log( { user: request.user})
        console.log(body)

        return this.tasksService.updateTask(+taskId, body.title, body.description, body.status);
    }

    
    // @Delete('remove_for_user')
    // @UseGuards(JwtAuthGuard)
    // @UsePipes(new ValidationPipe())
    // removeTasks(
    //     @Body() body
    // )
    // {
    //     console.log(body)

    //     // bla bla bla it looks like it is matching the first delete when I send the delete request from insomnia
    //     // TODO: vezi care-i jmenu, trebuie sa excluzi endpointul de la match-ul primului delete sau e alta skema
    //     // pare ca e ok sa il pun p-asta inaintea aluia cu :id 
    //     // TODO: !!! please check this
    // }


    
    @Delete(':id')
    @UseGuards(JwtAuthGuard, CanEditTaskGuard)
    @CanEditTask()
    removeTask(
        @Param('id') taskId: string
    )
    {
        console.log(taskId)

        return this.tasksService.removeTask(+taskId)
    }


    
    @Get("task-list")
    @UseGuards(JwtAuthGuard, CanGetTaskListGuard)
    @CanGetTaskList()
    getTaskListForUser(
        @Request()  request,
        @Body()     body)
    {
        console.log("getTaskListForUser")
        console.log( { user: request.user})
        console.log(body)

        if (request.user.role == Role.User)
        {
            // get list of tasks that owns
            return this.tasksService.getTaskListForUser(request.user.id)
        }
        // get list of tasks for specified user id
        return this.tasksService.getTaskListForUser(body.userId)
    }

    
    @Get(':id')
    @UseGuards(JwtAuthGuard, CanEditTaskGuard)
    @CanEditTask()
    getTask(@Param('id') taskId)
    {
        console.log(taskId)

        return this.tasksService.getTaskById(taskId)
    }


}
