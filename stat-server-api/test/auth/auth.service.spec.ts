import { AuthService } from '@auth/auth.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { LogContext} from '@log/log.enums'
import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { LogService } from '@log/log.service'; 

jest.mock('@users/users.service');

describe('AuthService', () => {
  const userData = {
    userId: 1,
    username: 'admin',
    password: 'admin',
  };
  const token = "token";
  const payload = { sub: userData.userId, username: userData.username };

  let mockedFindOne: jest.SpyInstance<Promise<any>, [username: string], any>;
  let mockedsignAsync: jest.SpyInstance<Promise<string>, [payload: object | Buffer, options?: JwtSignOptions], any>;

  let service: AuthService;
  let jwtService: JwtService;
  let userService: UsersService;
  let logService: LogService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        UsersService, 
        {
          provide: LogService,
          useValue: {
            debug: jest.fn(),
            notice: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    logService = module.get<LogService>(LogService);

    // Mock the findOne method of userService
    mockedFindOne = jest
      .spyOn(userService, 'findOne')
      .mockReturnValueOnce(Promise.resolve(userData))
      .mockReturnValue(undefined)

    // Mock the signAsync method of jwtService
    mockedsignAsync = jest
      .spyOn(jwtService, 'signAsync')
      .mockResolvedValue(token);   
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a valid token', async () => {
    const userName = "admin"
    const result = await service.signIn(userName, "admin");

    expect(mockedFindOne).toHaveBeenCalledWith(userName);
    expect(mockedsignAsync).toHaveBeenCalledWith(payload);
    expect(result).toStrictEqual({
      access_token: token,
    });

    expect(logService.debug).toHaveBeenCalledWith(
      `Authenticating user: '${userName}'`,
      LogContext.AuthService,
    );
  });

  test.each([
      ['foo', 'bar'],
      ['admin', 'foo'],
    ])('should throw an error for mismatched user / password input', async (userName, password) => {
      expect.assertions(2);
      await service.signIn(userName, password).catch(error => expect(error).toEqual(new UnauthorizedException()));

      expect(logService.notice).toHaveBeenCalledWith(
        `Unable to authenticate user: '${userName}'`,
        LogContext.AuthService,
      );
  });
});
