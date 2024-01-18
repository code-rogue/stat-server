import { Module } from '@nestjs/common';
import { AppService } from '@app/app.service';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  providers: [AppService],
})
export class AppModule {}
