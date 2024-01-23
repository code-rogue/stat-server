import { ConfigService } from '@nestjs/config';
//import { DatabaseConfig } from '@config/config.dto';
import { DatabaseService } from '@database/database.service';
import { LogContext } from '@log/log.enums'
import { LogService } from '@log/log.service';
import { Sequelize } from 'sequelize';
import { Test, TestingModule } from '@nestjs/testing';

const testDatabaseConfig = {
    database: "myDB",
    host: "myHost",
    password: "mypass",
    port: 1000,
    username: "myuser",
}

describe('DatabaseService', () => {
  let configService: ConfigService;
  let databaseService: DatabaseService;
  let logService: LogService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
            DatabaseService,
          {
            provide: ConfigService,
            useValue: {
              get: jest.fn().mockImplementation(() => testDatabaseConfig),
            },
          },
          {
            provide: LogService,
            useValue: {
              notice: jest.fn(),
            },
          },
        ],
      }).compile();
      databaseService = module.get<DatabaseService>(DatabaseService);
      logService = module.get<LogService>(LogService);
      configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(databaseService).toBeDefined();
  });

  it('should initialize config and log database configuration in the constructor', () => {
    expect(configService.get).toHaveBeenCalledWith('database');
    expect(logService.notice).toHaveBeenCalledWith(
      `Database Configuration: ${JSON.stringify(testDatabaseConfig)}`, LogContext.DatabaseService,
    );
  });

  it('should provide a Sequelize instance with correct configuration', () => {
    const sequelizeInstance = databaseService.sequelize();
    expect(sequelizeInstance).toBeInstanceOf(Sequelize);
    expect(sequelizeInstance.getDialect()).toBe('postgres');
    expect(sequelizeInstance.config.host).toBe(testDatabaseConfig.host);
    expect(sequelizeInstance.config.username).toBe(testDatabaseConfig.username);
    expect(sequelizeInstance.config.password).toBe(testDatabaseConfig.password);
    expect(sequelizeInstance.config.database).toBe(testDatabaseConfig.database);
    expect(sequelizeInstance.config.port).toBe(testDatabaseConfig.port);
  });
});