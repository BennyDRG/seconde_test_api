import { Injectable } from '@nestjs/common';
import { CreateBookDTO } from './dto/create-book.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BooksService {
    constructor(private readonly prisma: PrismaService) { }

    findAll() {
        return this.prisma.book.findMany();
    }

    findById(id: number) {
        return this.prisma.book.findUnique({ where: { id } });
    }

    async create(createBookDTO: CreateBookDTO) {
        await this.prisma.book.create({
            data: createBookDTO,
        });
    }

    delete(id: number) {
        return this.prisma.book.delete({ where: { id } });
    }
}
