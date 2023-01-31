import {Module, MiddlewareConsumer, RequestMethod, NestModule} from '@nestjs/common';
import {ApiModule} from "../Api/api.module";
import {join} from "path";
import { ServeStaticModule } from '@nestjs/serve-static';


@Module({
  imports: [ApiModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'out'),
    }),],
  controllers: [],
  providers: [],
})
export class AppModule {}