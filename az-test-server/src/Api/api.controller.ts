import {Body, Controller, Get, Post, Query, Request, Response} from '@nestjs/common';
import { ApiService } from './api.service';
import {randomUUID} from "crypto";
import {addNumberScheme} from "../Pipes/Jois/NumberJoi";
import {JoiValidationPipe} from "../Pipes/joiValidationPipe";
import {PostScheme} from "../Pipes/Jois/PostsJoi";

//Интерфейс для эндпоинта добавления номера
interface IaddNumberBody extends INubmerUnit{}

@Controller('api')
//Класс апи контроллера
export class ApiController {
    constructor(private readonly appService: ApiService) {}

    @Get('login')
    //Метод класса контроллера для логина пользователей
    login_controller(@Request() request, @Response() response): void {
        //проверяем, нет ли у пользователя куки с аккаунтом
        if(!request.cookies.account) {
            //Создаем случайный айди
            const uuid = randomUUID();
            //отдаем куки пользователю
            response.cookie('account', uuid, {
                expires: new Date(Date.now() + (150 * 24 * 60 * 60 * 1000)),
                httpOnly: true,
                path: '/'
            });
            //Добавляем условленный пост в аккаунт
            const newPostBody: IAfishaUnit = {author: 'Я - новый автор', text: 'Текст, текст и еще раз текст...'}
            //Добавляем его
            this.appService.addNewPost_service({userId: uuid, post: newPostBody}, true)
        };
        //Отсылаем ок
        response.status(200).send('OK')
    }
    @Post('addNumber')
    //Метод контроллера, ответственный за обработку эндпоинта добавления числа
    addNumber_controller(
        @Body(new JoiValidationPipe(addNumberScheme)) body: IaddNumberBody,
        @Request() request,
        @Response() response
    ) {
        //Вызываем метод сервиса и возвращаем его
        this.appService.addNumber_service({userId: request.body.account, unit: body});
        //Переадрисовываем запрос для получения нового списка, с кваери, так как тело запроса при переадресации умирает
        response.redirect(`/api/allCalculations?user=${request.body.account}`)
    }

    @Get('allCalculations')
    //Метод контроллера, ответственный за обработку эндпоинта получения расчетов
    allCalculations_controller(@Request() request, @Query() query: {user: string}): Icalculated[] | 0{
        //Вызываем метод сервиса ЛИБО ИЗ КВАЕРИ ЛИБО ИЗ реквеста
        return this.appService.allCalculations_service(query.user || request.body.account)
    }

    @Post('addNewPost')
    //Метод контроллера, ответственный за обработку эндпоинта добавления поста
    addNewPost_controller(
        @Body(new JoiValidationPipe(PostScheme)) body: IAddNewPost,
        @Request() request
    ): string {
        //Вызываем метод сервиса и возвращаем результат вывода
        return this.appService.addNewPost_service({userId: request.body.account, post: body.post}, false)
    };

    @Get('getAllPosts')
    //Метод контроллера, ответственный за обработку жндпоинат получения постов
    getAllPosts_controller(@Request() request): IAfishaUnit[] {
        //Вызываем метод сервиса и возвращаем результат вывода
        return this.appService.getAllPosts_service(request.body.account);
    }
}
