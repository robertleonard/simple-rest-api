import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(64)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(64)
  email?: string;

  @IsString()
  @MinLength(6)
  @MaxLength(64)
  role?: string;
}
