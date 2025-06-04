import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guard';
// import { Task } from 'generated/prisma';

@Controller('tasks')
export class TasksController 
{
    constructor(private tasksService : TasksService) {};


    // @UseGuards(AuthGuard('jwt'))
    @Post('create')
    @UseGuards(JwtAuthGuard)
    
    // use a Data Transfer Object to get the body from the http request 
    createTask(
        @Request() request,
        @Body() body
    ) 
    {
        console.log( { body: body }) 
        console.log( { user: request.user})

        if (body.title && body.status) {
            return this.tasksService.createTask(body.title, body.description ? body.description  : "", body.status, request.user.id);
        }
        else {
            return {error: "Please fill the task data"}
        }
        
    }

    
    @Patch('update/:id')
    @UseGuards(JwtAuthGuard)
    async updateTask(
        @Param('id') taskId: string,
        @Request() request,
        @Body() body
    )
    {
        console.log(taskId)
        console.log( { user: request.user})
        console.log(body)
        if(request.user.role == 'user')
        {
            // The authenticated user id is the same with the userId of the task with taskId
            const taskUserId = await this.tasksService.getUserIdForTask(+taskId)
            console.log(request.user.id)
            console.log(taskUserId)
            if(request.user.id == taskUserId)
            {
                return this.tasksService.updateTask(+taskId, body.title, body.description, body.status);
            }
            else
            {
                console.log('throw new UnauthorizedException()');
                throw new UnauthorizedException(); 
            }
        }
        else
        {
            return this.tasksService.updateTask(+taskId, body.title, body.description, body.status);
        }

    }

    
    @Delete('remove_for_user')
    @UseGuards(JwtAuthGuard)
    removeTasks(@Body() body)
    {
        console.log(body)

        // bla bla bla it looks like it is matching the first delete when I send the delete request from insomnia
        // TODO: vezi care-i jmenu, trebuie sa excluzi endpointul de la match-ul primului delete sau e alta skema
        // pare ca e ok sa il pun p-asta inaintea aluia cu :id 
        // TODO: !!! please check this
    }


    
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    removeTask(@Param('id') id: string, @Body() body)
    {
        console.log(id)
        console.log(body)

        return this.tasksService.removeTask(+id)
    }


    
    @Get("task-list")
    @UseGuards(JwtAuthGuard)
    getTaskListForUser(@Body() body)
    {
        console.log(body)

        return this.tasksService.getTaskListForUser(body.userId)
    }

    
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getTask(@Param('id') id : string, @Body() body)
    {
        console.log(id)
        console.log(body)

        return this.tasksService.getTaskById(id)
    }


}
