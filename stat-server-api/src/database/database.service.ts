import { DatabaseConfig } from '@config/config.dto';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { LogContext } from '@log/log.enums'
import { LogService } from '@log/log.service'; 
import { Sequelize } from 'sequelize';

@Injectable()
export class DatabaseService {
  private readonly config: DatabaseConfig;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LogService
  ) {
    this.config = configService.get<DatabaseConfig>('database');
    logger.notice(`Database Configuration: ${JSON.stringify(this.config)}`, LogContext.DatabaseService)
  }

  public sequelize(): Sequelize {
    return new Sequelize({
        dialect: 'postgres',
        host: this.config.host,
        username: this.config.username,
        password: this.config.password,
        database: this.config.database,
        port: this.config.port,
    });
  }
}