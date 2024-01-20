import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '@auth/auth.controller';
import { AuthDto } from '@auth/auth.dto';
import { AuthGuard } from '@auth/auth.guard';
import { AuthService } from '@auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/users.service';

describe('AuthController', () => {
  const token = { acess_token: "token" };
  const request = { user: { id: 0, username: 'admin' } };
  const signInDto: AuthDto = { username: 'admin', password: 'admin' };

  let authService: AuthService;
  let controller: AuthController;
  let mockedSignIn: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthGuard, AuthService, JwtService, UsersService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    mockedSignIn = jest
      .spyOn(authService, 'signIn')
      .mockReturnValue(Promise.resolve(token))
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('SignIn should call Auth Service SignIn', () => {
    controller.signIn(signInDto)
    expect(mockedSignIn).toHaveBeenCalledWith(signInDto.username, signInDto.password);
  });

  it('getProfile should return the user model when authenticated', () => {
    jest.spyOn(AuthGuard.prototype, 'canActivate').mockReturnValue(Promise.resolve(true));
    
    const result = controller.getProfile(request)
    expect(result).toBe(request.user);
  });
});
