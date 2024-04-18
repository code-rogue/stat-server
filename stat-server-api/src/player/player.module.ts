import { AuthModule } from '@auth/auth.module';
import { DatabaseModule } from '@database/database.module';
import { LogService } from '@log/log.service';
import { Module } from '@nestjs/common';
import { PlayerController } from '@player/player.controller';
import { PlayerService } from '@player/player.service';


@Module({
  imports: [AuthModule, DatabaseModule],
  providers: [LogService, PlayerService],
  controllers: [PlayerController],
  exports: [PlayerService],
})
export class PlayerModule {}
