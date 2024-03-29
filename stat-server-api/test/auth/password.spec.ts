import { Test, TestingModule } from '@nestjs/testing';
import { Password } from '@auth/auth.password';

import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('password management functions', () => {
    let service: Password;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [Password],
      }).compile();
  
      service = module.get<Password>(Password);
    });
  
    it('should hash a password', async () => {
        const mockHash = jest.fn().mockResolvedValue('hashedPassword');
        (bcrypt.hash as jest.Mock) = mockHash;

        const password = 'mySecretPassword';
        const hashedPassword = await service.hashPassword(password);

        expect(mockHash).toHaveBeenCalledWith(password, 10);
        expect(hashedPassword).toBe('hashedPassword');
    });

    it('should compare a plain text password with a hash', async () => {
        const mockCompare = jest.fn().mockResolvedValue(true);
        (bcrypt.compare as jest.Mock) = mockCompare;

        const password = 'mySecretPassword';
        const hashedPassword = 'myHashedPassword';
        const result = await service.comparePasswords(password, hashedPassword);

        expect(mockCompare).toHaveBeenCalledWith(password, hashedPassword);
        expect(result).toBe(true);
    });
});
