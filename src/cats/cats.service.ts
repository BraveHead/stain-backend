import { Cat } from '@/cats/interfaces/cat.interface';
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

  async findAll() {
    // throw new GatewayTimeoutException();
    await timeout(6000);
    return this.cats;
  }
}
