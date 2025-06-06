import { Injectable } from '@nestjs/common';
import { PrismaSqlService } from 'src/prisma-sql/prisma-sql.service';

@Injectable()
export class UsersService {
  constructor(private prismaSqlService: PrismaSqlService) {}

  async getUserById(id: string) {
    const user = await this.prismaSqlService.user.findUnique({
      where: {
        id: +id,
      },
    });
    return user;
  }

  async removeUserById(id: string) {
    const user = await this.prismaSqlService.user.delete({
      where: {
        id: +id,
      },
    });

    return user;
  }

  async getAllUsers() {
    const users = await this.prismaSqlService.user.findMany();
    return users;
  }
}
