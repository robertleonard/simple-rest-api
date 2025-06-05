import { IsEmail, IsIn, IsNotEmpty, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class SignUpDto
{
    @IsString()
    @IsNotEmpty()
    @Length(0, 50)
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(64)
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsIn(['user', 'admin'])
    role: string;
}