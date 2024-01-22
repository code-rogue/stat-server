import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LogContext} from '@log/log.enums'
import { LogService } from '@log/log.service'; 

@Injectable()
export class AuthService {
  constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
      private readonly logger: LogService
    ) {}

  async signIn(username: string, pass: string): Promise<any> {
    this.logger.debug(`Authenticating user: '${username}'`, LogContext.AuthService);
    
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      this.logger.notice(`Unable to authenticate user: '${username}'`, LogContext.AuthService);
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}