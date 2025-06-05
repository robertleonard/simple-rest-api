import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { PrismaSqlModule } from './prisma-sql/prisma-sql.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(
      {isGlobal: true}
    ),
    AuthModule, 
    UsersModule, 
    TasksModule, 
    PrismaSqlModule],
})
export class AppModule {}
