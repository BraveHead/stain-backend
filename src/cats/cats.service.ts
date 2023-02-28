import { Cat } from '@/cats/interfaces/cat.interface';
import { User } from '@/common/decorator/user.decorator';
import { GatewayTimeoutException, Injectable } from '@nestjs/common';

const timeout = (ms: number) => {
  return new Promise((resover) => setTimeout(resover, ms));
};

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  async findAll(username: string) {
    // throw new GatewayTimeoutException();
    console.log('username:', username);
    await timeout(6000);
    return this.cats;
  }
}
