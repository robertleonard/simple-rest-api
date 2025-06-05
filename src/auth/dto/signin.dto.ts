import { IsNotEmpty, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class SignInDto
{
    @IsString()
    @IsNotEmpty()
    @Length(0, 50)
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(64)
    password: string;
}