import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@auth/auth.service';
import { LogContext} from '@log/log.enums'
import { LogService } from '@log/log.service';
import { DatabaseService } from '@database/database.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { Password } from '@auth/auth.password';
import { UserService } from '@user/user.service';
import { User } from '@user/user.dto';

jest.mock('@database/database.service');
jest.mock('@nestjs/jwt');
jest.mock('@user/user.service');
jest.mock('@user/user.dto');
jest.mock('@auth/auth.password');

describe('AuthService', () => {
  const mockUser = { id: 1, userName: 'testUser', hashedPassword: 'hashedPassword' } as User;
  
  let authService: AuthService;
  let logService: LogService;
  let databaseService: DatabaseService;
  let jwtService: JwtService;
  let passwordService: Password;
  //let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: LogService,
          useValue: {
            debug: jest.fn(),
          },
        },
        DatabaseService,
        JwtService,
        Password,
        //UserService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    logService = module.get<LogService>(LogService);
    databaseService = module.get<DatabaseService>(DatabaseService);
    jwtService = module.get<JwtService>(JwtService);
    passwordService = module.get<Password>(Password);
    //userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should throw UnauthorizedException for invalid credentials', async () => {
      const mockedGetUser = jest.spyOn(UserService.prototype, 'fetchUser').mockReturnValue(Promise.resolve(null));
      //(UserService.fetchUser as jest.Mock).mockResolvedValueOnce(null);
      
      await expect(authService.signIn('nonexistentUser', 'invalidPassword')).rejects.toThrow(UnauthorizedException);

      expect(logService.debug).toHaveBeenNthCalledWith(1, 
        `Authenticating user: 'nonexistentUser'`, 
        LogContext.AuthService
      );
    });
  
    it.skip('should sign in a user with valid credentials', async () => {
      //(UserService.prototype.fetchUser as jest.Mock).mockResolvedValue(Promise.resolve(mockUser));
      const mockedGetUser = jest.spyOn(UserService.prototype, 'fetchUser').mockReturnValue(Promise.resolve(mockUser));
      (passwordService.comparePasswords as jest.Mock).mockResolvedValueOnce(true);
      (jwtService.signAsync as jest.Mock).mockResolvedValueOnce('mockAccessToken');

      const result = await authService.signIn('testUser', 'password');

      expect(logService.debug).toHaveBeenNthCalledWith(1, 
        `Authenticating user: 'testUser'`, 
        LogContext.AuthService
      );

      expect(result.access_token).toEqual('mockAccessToken');
      expect(mockedGetUser).toHaveBeenCalledWith('testUser');
      expect(passwordService.comparePasswords).toHaveBeenCalledWith('password', 'hashedPassword');
      expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: 1, userName: 'testUser' });
    });

    it.skip('should throw UnauthorizedException for incorrect password', async () => {
      const mockedGetUser = jest.spyOn(UserService.prototype, 'fetchUser').mockReturnValue(Promise.resolve(mockUser));
      (passwordService.comparePasswords as jest.Mock).mockResolvedValueOnce(false);

      await expect(authService.signIn('testUser', 'incorrectPassword')).rejects.toThrow(UnauthorizedException);

      expect(logService.debug).toHaveBeenNthCalledWith(1, 
        `Authenticating user: 'testUser'`, 
        LogContext.AuthService
      );
      expect(logService.debug).toHaveBeenNthCalledWith(2,
        `Unable to authenticate user: 'testUser'`, 
        LogContext.AuthService
      );
    });
  });
});