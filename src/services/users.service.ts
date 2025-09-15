import { inject, injectable } from 'tsyringe';

import { IUserService } from '../interfaces';
import { GreetResponse } from '../types';
import { UserRepository } from '../repositories/users.repository';
import { UserEntity } from '../entities';
import { UserProfiles } from '../constants';

@injectable()
export class UsersService implements IUserService {
    constructor(@inject(UserRepository) private readonly repository: UserRepository) {}

    public sayHello(): GreetResponse {
        return {
            message: 'Hello, User!',
        };
    }

    public async createUser(
        name: string,
        username: string,
        profile: UserProfiles,
        modifierId?: string,
    ): Promise<string> {
        const user = {
            name,
            username,
            profile,
            createdAt: new Date(),
            lastUpdate: new Date(),
            modifierId: modifierId || 'system',
        };
        return await this.repository.createUser(user as UserEntity);
    }
}
