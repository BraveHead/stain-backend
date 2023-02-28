import { Cat } from '@/cats/interfaces/cat.interface';
import { HttpExceptionFilter } from '@/common/exception/http-execption.filter';
import { RolesGuard } from '@/common/guard/roles.guard';
import { CacheInterceptors } from '@/common/interceptor/cache.interceptor';
import { ErrorsInterceptor } from '@/common/interceptor/exception.interceptor';
import { LoggingInterceptor } from '@/common/interceptor/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptor/timeout.interceptor';
import { TransformInterceptor } from '@/common/interceptor/transform.interceptor';
import {
  Body,
  // CacheInterceptor,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  SetMetadata,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  //** post /cats */
  @Post()
  // @SetMetadata('roles', ['admin'])
  // @HttpCode(202)
  // @Header('Cache-Control', 'none')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['admin'])
  // @UseInterceptors(LoggingInterceptor)
  async create(
    @Body() createCatDto: CreateCatDto,
  ): Promise<string | Record<string, any>> {
    this.catsService.create(createCatDto);
    return !createCatDto?.age
      ? 'This action add a new cat'
      : {
          ...createCatDto,
        };
  }

  //** get /cats */
  @Get()
  @UseInterceptors(TimeoutInterceptor)
  // @UseInterceptors(CacheInterceptors)
  async findAll(): Promise<Cat[]> {
    // const text = 'This action returns all cats!';
    // const processData = new Promise<string>((resolve) => {
    //   setTimeout(() => {
    //     resolve(text);
    //   }, 3000);
    // });
    // const newData = await processData;
    // return newData;
    return this.catsService.findAll();
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
