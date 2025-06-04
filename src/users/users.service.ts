import { Injectable } from '@nestjs/common';
import { PrismaSqlService } from 'src/prisma-sql/prisma-sql.service';

@Injectable()
export class UsersService
{
    constructor(private prismaSqlService : PrismaSqlService) {}

    async remove(id : string)
    : Promise<{user}>
    {

        const user = await this.prismaSqlService.user.delete({
            where : {
                id: +id
            }
        });

        return {user};
    }

}
