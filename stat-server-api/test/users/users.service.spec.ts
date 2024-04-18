import { LogContext} from '@log/log.enums';
import { LogService } from '@log/log.service'; 
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@user/user.service';
import { User } from '@interfaces/user.dto'

jest.mock('@interfaces/user.dto');

describe('UsersService', () => {
  let logService: LogService;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: LogService,
          useValue: {
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    logService = module.get<LogService>(LogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchUser', () => {
    it('should fetch user from the database', async () => {
      // Mocking the behavior of the User model
      const mockUser = { userName: 'testUser' };
      (User.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

      const userName = 'testUser';
      const user = await service.fetchUser(userName);

      expect(user).toEqual(mockUser);
      expect(User.findOne).toHaveBeenCalledWith({
        where: { userName },
      });
    });

    it('should handle errors and log them', async () => {
      // Mocking an error during database query
      const mockError = new Error('Database error');
      (User.findOne as jest.Mock).mockRejectedValueOnce(mockError);

      const userName = 'testUser';

      // Ensuring the error is logged
      expect(await service.fetchUser(userName)).toBeUndefined();
      expect(logService.error).toHaveBeenCalledWith(
        `Unable to query user: ${userName}`,
        mockError.stack,
        LogContext.UserService
      );
    });
  });
});