import { AuthService } from '@auth/auth.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@users/users.service';

jest.mock('@users/users.service');

describe('AuthService', () => {
  const userData = {
    userId: 1,
    username: 'admin',
    password: 'admin',
  };
  const token = "token";
  const payload = { sub: userData.userId, username: userData.username };

  let service: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;
  let mockedFindOne: jest.SpyInstance<Promise<any>, [username: string], any>;
  let mockedsignAsync: jest.SpyInstance<Promise<string>, [payload: object | Buffer, options?: JwtSignOptions], any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, UsersService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);

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
    const result = await service.signIn("admin", "admin");

    expect(mockedFindOne).toHaveBeenCalledWith("admin");
    expect(mockedsignAsync).toHaveBeenCalledWith(payload);
    expect(result).toStrictEqual({
      access_token: token,
    });
  });

  test.each([
      ['foo', 'bar'],
      ['admin', 'foo'],
    ])('should throw an error for mismatched user / password input', async (username, password) => {
      expect.assertions(1);
      return service.signIn(username, password).catch(error => expect(error).toEqual(new UnauthorizedException()));
  });
});
