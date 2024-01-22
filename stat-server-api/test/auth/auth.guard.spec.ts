import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { LogContext} from '@log/log.enums'
import { LogService } from '@log/log.service'; 
import { UnauthorizedException } from '@nestjs/common';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;
  let logService: LogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: LogService,
          useValue: {
            debug: jest.fn(),
            notice: jest.fn(),
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
    logService = module.get<LogService>(LogService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should throw UnauthorizedException if no token is provided', async () => {
      const context = {
            switchToHttp: jest.fn().mockReturnValue({
                getRequest: jest.fn().mockReturnValue({}),
            }),
      };

      jest.spyOn(guard, 'extractTokenFromHeader').mockReturnValueOnce(undefined);
      await expect(guard.canActivate(context as any)).rejects.toThrow(UnauthorizedException);

      expect(logService.notice).toHaveBeenCalledWith(
        'Unauthorized request - missing token', 
        LogContext.AuthGuard
      );
    });

    it('should throw UnauthorizedException if token verification fails', async () => {
      const context = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({
            headers: { authorization: 'Bearer invalid-token' },
          }),
        }),
      };

      jest.spyOn(guard, 'extractTokenFromHeader').mockReturnValueOnce('invalid-token');
      jest.spyOn(jwtService, 'verifyAsync').mockRejectedValueOnce(new Error('Invalid token'));

      await expect(guard.canActivate(context as any)).rejects.toThrow(UnauthorizedException);

      expect(logService.error).toHaveBeenCalledWith(
        'Unable to verify token',
        expect.any(String), // expect.any(String) matches any string (stack trace)
        expect.any(Error), // expect.any(Error) matches any error object
      );
    });

    it('should set user property on request if token verification is successful', async () => {
      const context = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({
            headers: { authorization: 'Bearer valid-token' },
          }),
        }),
      };

      const payload = { userId: 1, username: 'testUser' };
      jest.spyOn(guard, 'extractTokenFromHeader').mockReturnValueOnce('valid-token');
      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValueOnce(payload);

      await guard.canActivate(context as any);

      expect(context.switchToHttp().getRequest().user).toEqual(payload);

      expect(logService.debug).toHaveBeenCalledWith(
        'Assigning payload to request', 
        LogContext.AuthGuard
      );
    });
  });

  describe('extractTokenFromHeader', () => {
    it('should return undefined if no authorization header', () => {
      const request: any = {
        headers: {},
      };

      const result = guard.extractTokenFromHeader(request);

      expect(result).toBeUndefined();
    });

    it('should return undefined if authorization header does not start with "Bearer"', () => {
      const request: any = {
        headers: {
          authorization: 'InvalidToken',
        },
      };

      const result = guard.extractTokenFromHeader(request);

      expect(result).toBeUndefined();
    });

    it('should return the token if authorization header starts with "Bearer"', () => {
      const request: any = {
        headers: {
          authorization: 'Bearer valid-token',
        },
      };

      const result = guard.extractTokenFromHeader(request);

      expect(result).toEqual('valid-token');
    });
  });
});