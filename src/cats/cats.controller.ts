import { Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import { CreateCatDto } from './utils/CreateCat.dto';
import { Observable, of } from 'rxjs';
import { CatsService } from './cats/cats.service';
import { Cat } from './cats/interfaces/cat.interface';

@Controller('cats')
export class CatsController {

    constructor(private readonly catsService: CatsService) {}
    @Get()
    async findAll() :Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Post()
    async create(@Body() createCatDto: CreateCatDto,@Res() response) {
        this.catsService.create(createCatDto);
        response.status(201).send();
    }
    @Get(":id")
    findOne(@Param('id') id: string) {
        return `This action returns a ${id} cat`;
    }
}
