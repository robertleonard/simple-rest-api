import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaSqlModule } from 'src/prisma-sql/prisma-sql.module';

@Module({
  providers:    [UsersService],
  exports:      [UsersService],
  controllers:  [UsersController],
  imports:      [PrismaSqlModule]
})
export class UsersModule {}
