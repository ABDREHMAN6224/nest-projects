import { Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import { CreateCatDto } from './utils/CreateCat.dto';
import { Observable, of } from 'rxjs';

@Controller('cats')
export class CatsController {
    @Get()
    findAll() :Observable<string> {
        return of('This action returns all cats');
    }

    @Post()
    create(@Body() createCatDto: CreateCatDto,@Res() response) {
        response.status(201).send();
    }
    @Get(":id")
    findOne(@Param('id') id: string) {
        return `This action returns a ${id} cat`;
    }
}
