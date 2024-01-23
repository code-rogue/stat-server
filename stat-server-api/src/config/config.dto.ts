export class ConfigOptions {
    app: ApplicationConfig;
    database: DatabaseConfig;
  }

export class ApplicationConfig {
  port: number;
  swagger: string;
}

export class DatabaseConfig {
    database: string;
    host: string;
    password: string;
    port: number;
    username: string;
  }