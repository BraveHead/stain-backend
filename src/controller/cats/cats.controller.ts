import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { log } from 'console';
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

  @Get(':id')
  findOne(@Param() params): string {
    console.log('paramsId:', params.id);
    return `This action returns a #${params.id} cat`;
  }

  //** get /cats/ab* */
  @Get('ab*')
  find(): string {
    return 'This action only return ab* cats';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version: string) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
