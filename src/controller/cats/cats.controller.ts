import {
  Body,
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
import { Request } from 'express';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  //** post /cats */
  @Post()
  @HttpCode(202)
  @Header('Cache-Control', 'none')
  async createCat(
    @Body() createCatDto: CreateCatDto,
  ): Promise<string | Record<string, any>> {
    console.log('createCatDto:', createCatDto);
    return !createCatDto?.age
      ? 'This action add a new cat'
      : {
          ...createCatDto,
        };
  }

  //** get /cats */
  @Get()
  async findAll(@Req() request: Request): Promise<string> {
    const text = 'This action returns all cats!';
    const processData = new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(text);
      }, 3000);
    });
    const newData = await processData;
    return newData;
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
