import { Cat } from '@/cats/interfaces/cat.interface';
import { GatewayTimeoutException, Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    // throw new GatewayTimeoutException();
    return this.cats;
  }
}
