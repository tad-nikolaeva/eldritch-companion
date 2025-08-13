import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

const postgres = require('postgres');

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        
        if (!connectionString) {
          throw new Error('DATABASE_URL не найден в переменных окружения');
        }

        const client = postgres(connectionString);
        return drizzle(client, { schema });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {} 