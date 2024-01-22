import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from '@auth/auth.constants';
  import { LogContext} from '@log/log.enums'
  import { Request } from 'express';
  import { LogService } from '@log/log.service'; 

  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private readonly logger: LogService
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        this.logger.notice("Unauthorized request - missing token", LogContext.AuthGuard);
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );
        // Assigning the payload to access it in route handlers
        request['user'] = payload;
        this.logger.debug("Assigning payload to request", LogContext.AuthGuard);
      } catch(error){
        this.logger.error("Unable to verify token", error.stack, error);
        throw new UnauthorizedException();
      }
      return true;
    }
  
    public extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }