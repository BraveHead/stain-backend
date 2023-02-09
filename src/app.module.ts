import { Module } from '@nestjs/common';
// import { AppController } from './controller/app.controller';
import { AppService } from './app.service';
import { AppController } from './controller/app/app.controller';
import { CatsController } from '@/controller/cats/cats.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
