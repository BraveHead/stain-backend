import {
  CacheModule,
  Dependencies,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
// import { AppController } from './controller/app.controller';
import { AppService } from './app.service';
import { AppController } from './controller/app/app.controller';
import { CatsController } from '@/cats/cats.controller';
import { AccountController } from './controller/host/host.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import {
  logger,
  LoggerMiddleware,
} from './common/middleware/logger.middleware';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { HttpExceptionFilter } from './common/exception/http-execption.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './User/user.entity';
import { UserHttpModule } from './User/users-http.module';
import { TypeOrmConfigService } from './typeorm.config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './common/guard/roles.guard';

@Dependencies(DataSource)
@Module({
  imports: [
    CatsModule,
    // CacheModule.register(),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: '127.0.0.1',
    //   port: 3306,
    //   username: 'root',
    //   password: 'zs123456',
    //   database: 'typeorm_demo',
    //   charset: 'utf8mb4',
    //   entities: [User],
    //   // retryAttempts: 12,
    //   synchronize: true, // 不能用于生产环境
    //   // autoLoadEntities: true,
    // }),
    TypeOrmModule.forRootAsync({
      // useFactory: () => ({
      //   type: 'mysql',
      //   host: '127.0.0.1',
      //   port: 3306,
      //   username: 'root',
      //   password: 'zs123456',
      //   database: 'typeorm_demo',
      //   charset: 'utf8mb4',
      //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //   // retryAttempts: 12,
      //   synchronize: true, // 不能用于生产环境
      //   // autoLoadEntities: true,
      // }),
      useClass: TypeOrmConfigService,
    }),
    UserHttpModule,
  ],
  controllers: [AppController, CatsController, AccountController],
  providers: [
    AppService,
    CatsService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger, LoggerMiddleware)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      .forRoutes(CatsController);
  }
}
