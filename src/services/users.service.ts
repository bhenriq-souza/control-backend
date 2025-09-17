import { injectable } from 'tsyringe';

import { IUserService } from '../interfaces';
import { GreetResponse } from '../types';

@injectable()
export class UsersService implements IUserService {
    constructor() {}

    public sayHello(requester: string): GreetResponse {
        return {
            message: `Hello, ${requester}!`,
        };
    }
}
