import { Module } from '@nestjs/common';
import { AppService } from '@app/app.service';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';
import { LogModule } from '@log/log.module';

@Module({
  imports: [AuthModule, UsersModule, LogModule],
  providers: [AppService],
})
export class AppModule {}
