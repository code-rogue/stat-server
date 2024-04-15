import { DatabaseService } from '@database/database.service'
import { InitUserModel } from '@interfaces/user.dto'
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LogContext} from '@log/log.enums'
import { LogService } from '@log/log.service'; 
import { Password } from '@auth/auth.password';
import { UserService } from '@user/user.service';

@Injectable()
export class AuthService {
  private password = new Password();
  
  constructor(
    private readonly logger: LogService,
    private readonly database: DatabaseService,
    private jwtService: JwtService
  ) {}

  async signIn(userName: string, password: string): Promise<any> {
    this.logger.debug(`Authenticating user: '${userName}'`, LogContext.AuthService);

    InitUserModel(this.database.sequelize());
    const userService = new UserService(this.logger);
    const user = await userService.fetchUser(userName);
    if(user) {
      const isAuthenticated = await this.password.comparePasswords(password, user.hashedPassword);
      if(isAuthenticated) {
        const payload = { sub: user.id, userName: user.userName };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
      this.logger.debug(`Unable to authenticate user: '${userName}'`, LogContext.AuthService);
    }

    throw new UnauthorizedException();
  }
}