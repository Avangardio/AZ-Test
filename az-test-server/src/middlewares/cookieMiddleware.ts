import {NextFunction, Request, Response} from 'express';
import {Injectable, NestMiddleware} from "@nestjs/common";

@Injectable()
//Миддлвейр, ответсвенный за проверку наличия аккаунта
export class CookieMiddleware implements NestMiddleware {
    //Метод миддлвейра
    use(req: Request, res: Response, next: NextFunction) {
        try {
            //пытаемся получить аккаунт
            const userAccount = req.cookies.account;
            //Все нормально, добавляем данные в реквест
            req.body.account = userAccount;
            //Иначе заканчиваем запрос
        } catch (error) {
            //с ошибкой
            return res.status(400).send('Verification Error')
        }
        //Если все хорошо, то отправляем дальше
        next()
    }
};