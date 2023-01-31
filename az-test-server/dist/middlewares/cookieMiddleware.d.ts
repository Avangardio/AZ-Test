import { NextFunction, Request, Response } from 'express';
import { NestMiddleware } from "@nestjs/common";
export declare class CookieMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;
}
