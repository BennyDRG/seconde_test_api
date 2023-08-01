import { Body, Controller, Delete, Get, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { CreateUserDTO } from "src/users/dto/create-user.dto";
import { UsersService } from "./users.service";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { JwtAuthGuard } from "./dto/jwt-auth.guard";
import { CurrentUser } from "./dto/current-user.decorator";
import { User } from "@prisma/client";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post("/sign-up")
    signUp(@Body(ValidationPipe) CreateUserDTO: CreateUserDTO) {
        return this.usersService.create(CreateUserDTO);
    }

    @Post("/sign-in")
    signIn(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO) {
        return this.usersService.signIn(authCredentialsDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/me")
    getMyProfile(@CurrentUser() user: User) {
        return this.usersService.getMyProfile(user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/me")
    deleteMyAccount(@CurrentUser() user: User) {
        return this.usersService.deleteMyAccount(user);
    }
}