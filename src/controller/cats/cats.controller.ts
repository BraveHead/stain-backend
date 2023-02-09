import { Controller, Get, Header, HttpCode, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  //** post /cats */
  @Post()
  @HttpCode(202)
  @Header('Cache-Control', 'none')
  create(): string {
    return 'This action add a new cat';
  }

  //** get /cats */
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats!';
  }
  //** get /cats/ab* */
  @Get('ab*')
  find(): string {
    return 'This action only return ab* cats';
  }
}
