import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats/cats.service';
import { CatsMiddleware } from './middlewares/cats/cats.middleware';

@Module({
  imports: [],
  controllers: [AppController, CatsController],
  providers: [
    AppService,
    CatsService,
    {
      provide: 'APP_PIPE',
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CatsMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
