import { Injectable } from '@nestjs/common';
import { LogContext} from '@log/log.enums';
import { LogService } from '@log/log.service'; 
import { User } from '@interfaces/user.dto'

@Injectable()
export class UserService {
  constructor(
    private readonly logger: LogService
  ) {}

  async fetchUser(userName: string): Promise<User | undefined> {
    try {
      const user = await User.findOne({
        where: { userName },
      });
      return user;
    } catch (error) {
      this.logger.error(`Unable to query user: ${userName}`, error.stack, LogContext.UserService);
      //console.error('Error: ', error)
      return undefined;
    }
  }
}
