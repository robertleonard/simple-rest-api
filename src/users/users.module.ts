import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaSqlModule } from 'src/prisma-sql/prisma-sql.module';

@Module({
  imports: [PrismaSqlModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
