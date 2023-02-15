import { Module } from '@nestjs/common';
// import { AppController } from './controller/app.controller';
import { AppService } from './app.service';
import { AppController } from './controller/app/app.controller';
import { CatsController } from '@/controller/cats/cats.controller';
import { AccountController } from './controller/host/host.controller';
import { CatsService } from './service/cats/cats.service';

@Module({
  imports: [],
  controllers: [AppController, CatsController, AccountController],
  providers: [AppService, CatsService],
})
export class AppModule {}
