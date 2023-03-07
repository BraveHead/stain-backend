import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserModule } from './user.module';
import { UserService } from './user.service';
import { UserSubscriber } from './user.subscriber';

@Module({
  imports: [UserModule],
  providers: [UserService, UserSubscriber],
  controllers: [UserController],
})
export class UserHttpModule {}
