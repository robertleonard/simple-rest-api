import { IsIn, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 50)
  title: string;

  @IsString()
  @Length(0, 256)
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['todo', 'in-progress', 'done'])
  status: string;
}
