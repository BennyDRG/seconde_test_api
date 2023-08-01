import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './dto/jwt-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      signOptions: { expiresIn: "30d" },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, JwtStrategy, JwtAuthGuard, JwtService]
})
export class UsersModule { }
