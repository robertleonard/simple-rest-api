import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { PrismaSqlService } from 'src/prisma-sql/prisma-sql.service';
import { TasksController } from './tasks.controller';
import { PrismaSqlModule } from 'src/prisma-sql/prisma-sql.module';

@Module({
  imports: [PrismaSqlModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
