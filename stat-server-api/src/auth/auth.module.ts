import { Module } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { AuthController } from '@auth/auth.controller';
import { DatabaseModule } from '@database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@auth/auth.constants';
import { LogModule } from '@log/log.module';

@Module({
  imports: [
    DatabaseModule,
    LogModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}