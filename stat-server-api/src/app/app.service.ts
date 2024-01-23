import { Injectable } from '@nestjs/common';
import { LogService } from '@log/log.service';
import { LogContext} from '@log/log.enums'

@Injectable()
export class AppService {
  constructor(private readonly logger: LogService) {}

  getHome(): string {
    this.logger.debug('Loading home page', LogContext.AppService)
    return 'Stat Server API';
  }
}
