import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { hash, compare } from "bcryptjs";
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { IsEmail } from 'class-validator';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) { }

    private createAuthentificationToken(userId: number): string {
        return this.jwtService.sign(
            {
                userId
            },
            {
                secret: "my-secret"
            }
        );
    }

    async create(createUserDTO: CreateUserDTO) {
        // Hash the password
        createUserDTO.password = await hash(createUserDTO.password, 10);

        // Insert the user into the databse
        await this.prisma.user.create({
            data: createUserDTO,
        });
    }

    private async findByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new NotFoundException(`user with email ${email} not found`);
        }

        return user;
    }

    async signIn(authCredentialsDTO: AuthCredentialsDTO) {
        let user: User;

        try {
            user = await this.findByEmail(authCredentialsDTO.email);
        } catch {
            throw new UnauthorizedException("invalid credentials");
        }

        const validPassword = await compare(authCredentialsDTO.password, user.password);

        if (!validPassword) {
            throw new UnauthorizedException("invalid cedentials");
        }

        const token = this.createAuthentificationToken(user.id);

        return { token };
    }

    getMyProfile(user: User) {
        return { profile: { email: user.email } };
    }

    async deleteMyAccount(user: User) {
        await this.prisma.user.delete({ where: { id: user.id } });

        return {
            message: "Your account is succesfully deleted"
        };
    }



}
