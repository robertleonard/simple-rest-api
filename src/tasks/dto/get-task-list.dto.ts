import { IsNumber } from 'class-validator';

export class GetTaskListDto {
  @IsNumber()
  userId?: number;
}
