import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }

    @Get()
    findAll() {
        return this.booksService.findAll();
    }
    @Post()
    create(@Body(ValidationPipe) createBookDTO: CreateBookDTO) {
        return this.booksService.create(createBookDTO);
    }
}  