import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { LogService } from '@log/log.service';

describe('AppController', () => {
  const request = { user: { id: 0, username: 'admin' } };
  let mockedGetHome;
  let service: AppService;
  let controller: AppController;
  let logService: LogService;
  
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: LogService,
          useValue: {
            debug: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<AppController>(AppController);
    service = app.get<AppService>(AppService);
    logService = app.get<LogService>(LogService);
    mockedGetHome = jest
      .spyOn(service, 'getHome')
      .mockReturnValue("home");
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('SignIn should call App Service getHome', () => {
    expect(controller.getProfile(request)).toEqual("home");
    expect(mockedGetHome).toHaveBeenCalled();
  });
});
