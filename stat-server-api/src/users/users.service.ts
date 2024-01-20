import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  public users = [
    {
      userId: 1,
      username: 'admin',
      password: 'admin',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username.toLowerCase() === username.toLowerCase());
  }
}
