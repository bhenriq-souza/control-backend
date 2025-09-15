import { injectable } from 'tsyringe';

import { IUserService } from '../interfaces';
import { GreetResponse } from '../types';

@injectable()
export class UsersService implements IUserService {
    constructor() {}

    sayHello(): GreetResponse {
        return {
            message: 'Hello, User!',
        };
    }
}
