import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaSqlService extends PrismaClient
{

    constructor()
    {
        super(
            {
                datasources: {
                    db: {
                        url: "postgresql://postgres:123@localhost:5434/nest?schema=public"
                    }
                }
            }
        )
    }

}
