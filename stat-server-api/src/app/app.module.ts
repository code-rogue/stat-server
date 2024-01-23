import { Module } from '@nestjs/common';
import { AppService } from '@app/app.service';
import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@database/database.module';
import { LogModule } from '@log/log.module';
import { readFileSync } from 'fs';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [AuthModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => { 
        return JSON.parse(readFileSync('./config.json').toString())
      }],
    }), 
    DatabaseModule, 
    LogModule, 
    UsersModule
  ],
  providers: [AppService],
})
export class AppModule {}
