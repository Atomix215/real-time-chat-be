import { Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  EnviornmentVariablesType,
  environmentVariablesSchema,
} from './config/envValidation.config';
import { DatabaseConfig } from './config/database.config';
import { DataSource } from 'typeorm';
import { UsersModule } from './modules/users/users.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { MessagesModule } from './modules/messages/messages.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => environmentVariablesSchema.parse(config),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: DatabaseConfig,
    }),
    UsersModule,
    RoomsModule,
    MessagesModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger('Database Connection');

  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService<EnviornmentVariablesType>,
  ) {}

  onModuleInit() {
    if (this.dataSource.isInitialized) {
      const port = this.configService.get('DB_PORT');
      const databaseName = this.configService.get('DB_DATABASE');
      this.logger.log(
        `✅ Database successfully connected to PostgreSQL on the PORT : ${port} and DATBASE_NAME : ${databaseName}`,
      );
    } else {
      this.logger.log('❌ There is a error while connecting to the database');
    }
  }
}
