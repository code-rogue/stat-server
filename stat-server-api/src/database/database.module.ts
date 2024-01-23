import { Module } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { LogModule } from '@log/log.module';

@Module({
  imports: [LogModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}