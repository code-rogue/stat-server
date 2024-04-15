import { LogService } from '@log/log.service';
import { Module } from '@nestjs/common';
import { UserService } from '@user/user.service';

@Module({
  providers: [UserService,LogService],
  exports: [UserService],
})
export class UserModule {}
