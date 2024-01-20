import { Test, TestingModule } from '@nestjs/testing';
import { UsersService, User } from '@users/users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user when it exists', async () => {
      const username = 'admin';
      const result: User | undefined = await service.findOne(username);

      expect(result).toBeDefined();
      expect(result?.username).toEqual(username);
    });

    it('should return undefined when the user does not exist', async () => {
      const username = 'nonexistent';
      const result: User | undefined = await service.findOne(username);

      expect(result).toBeUndefined();
    });

    it('should handle multiple users and find the correct one', async () => {
      const users: User[] = [
        { userId: 1, username: 'admin', password: 'admin' },
        { userId: 2, username: 'user2', password: 'pass2' },
        { userId: 3, username: 'user3', password: 'pass3' },
      ];

      // Set the users array in the service
      service['users'] = users;

      const username = 'user2';
      const result: User | undefined = await service.findOne(username);

      expect(result).toBeDefined();
      expect(result?.username).toEqual(username);
    });

    it('should return undefined when the users array is empty', async () => {
      // Set an empty users array in the service
      service['users'] = [];

      const username = 'anyUser';
      const result: User | undefined = await service.findOne(username);

      expect(result).toBeUndefined();
    });

    it('should handle case-insensitive username matching', async () => {
      const username = 'AdMiN'; // Case-insensitive
      const result: User | undefined = await service.findOne(username);

      expect(result).toBeDefined();
      expect(result?.username).toEqual(username.toLowerCase());
    });
  });
});