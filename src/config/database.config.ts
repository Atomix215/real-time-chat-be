import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnviornmentVariablesType } from './envValidation.config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const DatabaseConfig = (
  configService: ConfigService<EnviornmentVariablesType>,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  database: configService.get('DB_DATABASE'),
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  autoLoadEntities: true,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
});
