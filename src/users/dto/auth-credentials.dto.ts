import { IsEmail, IsString, Length } from "class-validator";

export class AuthCredentialsDTO {
    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 255)
    password: string;
}