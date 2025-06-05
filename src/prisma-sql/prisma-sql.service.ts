import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaSqlService extends PrismaClient
{

    constructor( private configService : ConfigService )
    {
        super(
            {
                datasources: {
                    db: {
                        url: configService.get('DATABASE_URL')
                    }
                }
            }
        )
    }

}
