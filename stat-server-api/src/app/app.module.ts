import { Module } from '@nestjs/common';
import { AppService } from '@app/app.service';
import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@database/database.module';
import { LogModule } from '@log/log.module';
import { PlayerModule } from '@player/player.module';
import { readFileSync } from 'fs';
import { UserModule } from '@root/src/user/user.module';

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
    PlayerModule,
    UserModule
  ],
  providers: [AppService],
})
export class AppModule {}
