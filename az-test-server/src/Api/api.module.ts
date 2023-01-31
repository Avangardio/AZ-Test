import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {CookieMiddleware} from "../middlewares/cookieMiddleware";

@Module({
    imports: [],
    controllers: [ApiController],
    providers: [ApiService],
})
export class ApiModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(CookieMiddleware)
            .exclude({path: 'api/login', method: RequestMethod.GET})
            .forRoutes(ApiController)
    }
}
