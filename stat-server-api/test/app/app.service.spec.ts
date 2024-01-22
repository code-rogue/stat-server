import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '@app/app.service';
import { LogContext} from '@log/log.enums'
import { LogService } from '@log/log.service'; 

jest.mock('@log/log.service')

describe('AppService', () => {
  let service: AppService;
  let logService: LogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AppService>(AppService);
    logService = module.get<LogService>(LogService);

    //jest.spyOn(logService, 'debug')
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return home page', () => {
    expect(service.getHome()).toEqual('Stat Server API');

    expect(logService.debug).toHaveBeenCalledWith(
      'Loading home page',
      LogContext.AppService,
    );
  });

  it('should log debug', () => {
    service.getHome();
    expect(logService.debug).toHaveBeenCalledWith(
      'Loading home page',
      LogContext.AppService,
    );
  });
});
