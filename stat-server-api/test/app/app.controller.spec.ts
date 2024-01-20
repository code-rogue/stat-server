import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';

describe('AppController', () => {
  const request = { user: { id: 0, username: 'admin' } };
  let service: AppService;
  let controller: AppController;
  let mockedGetHome;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = app.get<AppController>(AppController);
    service = app.get<AppService>(AppService);
    mockedGetHome = jest
      .spyOn(service, 'getHome')
      .mockReturnValue("home")
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('SignIn should call App Service getHome', () => {
    expect(controller.getProfile(request)).toEqual("home");
    expect(mockedGetHome).toHaveBeenCalled();
  });
});
