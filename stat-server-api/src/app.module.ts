import { Module } from '@nestjs/common';
import { AppService } from '@app/app.service';
import { AuthModule } from '@app/auth/auth.module';
import { UsersModule } from '@app/users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  providers: [AppService],
})
export class AppModule {}
