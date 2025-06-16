import { IsIn, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @Length(0, 50)
  title?: string;

  @IsString()
  @Length(0, 256)
  description: string;

  @IsString()
  @IsIn(['todo', 'in-progress', 'done'])
  status: string;
}
