import { Body, Controller, Delete, Get, Param, Patch, Post, UnauthorizedException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Request } from 'express';

@Controller('tasks')
export class TasksController 
{
    constructor(private tasksService : TasksService) {};


    @Post('create')
    // use a Data Transfer Object to get the body from the http request 
    createTask(
        // @Body('username') username: string,
        // @Body('email') email: string, 
        // @Body('password') password: string,
        // @Body('role') role: string
        @Body() taskDto
    ) 
    {
        console.log(taskDto)

        // console.log({
        //     singUpDto.username,
        //     singUpDto.email,
        //     singUpDto.password,
        //     singUpDto.role
        // });


        return this.tasksService.createTask(taskDto.title, taskDto.description, taskDto.status, taskDto.userId);
    }

    @Patch('update/:id')
    updateTask(@Param('id') id: string, @Body() taskDto)
    {
        console.log(id)
        console.log(taskDto)
        // if(taskDto.userId == "id that comes with the token for not admin basic users")
        // {
            return this.tasksService.updateTask(+id, taskDto.title, taskDto.description, taskDto.status, taskDto.userId);
        // }
        // else
        // {
        //     console.log('throw new UnauthorizedException()');
        //     throw new UnauthorizedException(); 
        // }
    }

    @Delete('remove_for_user')
    removeTasks(@Body() taskDto)
    {
        console.log(taskDto)

        // bla bla bla it looks like it is matching the first delete when I send the delete request from insomnia
        // TODO: vezi care-i jmenu, trebuie sa excluzi endpointul de la match-ul primului delete sau e alta skema
        // pare ca e ok sa il pun p-asta inaintea aluia cu :id 
        // TODO: !!! please check this
    }


    @Delete(':id')
    removeTask(@Param('id') id: string/*, @Body() taskDto*/)
    {
        console.log(id)
        // console.log(taskDto)

        return this.tasksService.removeTask(+id)
    }


    @Get("task-list")
    getTaskListForUser(@Body() taskDto)
    {
        console.log(taskDto)

        return this.tasksService.getTaskListForUser(taskDto.userId)
    }

    @Get(':id')
    getTask(@Param('id') id : string, @Body() taskDto)
    {
        console.log(id)
        console.log(taskDto)

        return this.tasksService.getTaskById(id)
    }


}
