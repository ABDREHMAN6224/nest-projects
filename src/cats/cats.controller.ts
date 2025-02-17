import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCatDto } from './utils/CreateCat.dto';
import { CatsService } from './cats/cats.service';
import { Cat } from './cats/interfaces/cat.interface';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Post()
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      groups: ['create'],
      always: true,
    }),
  )
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
  @Get(':id/:slug')
  findOne(@Param('id') id: string, @Param('slug') slug: string) {
    return `This action returns a ${id} cat with slug ${slug}`;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return `This action removes a #${id} cat`;
  }
}
