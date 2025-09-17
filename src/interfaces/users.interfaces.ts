import type { Response, Request } from 'express';
import { GreetResponse } from '../types';
import { UserEntity } from '../entities';

export interface IUserService {
    sayHello(requester: string): { message: string };
}

export interface IUserController {
    greet(req: Request, res: Response): Response<GreetResponse>;
}

export interface IUserRepository {
    createUser(user: UserEntity): Promise<string>;
}
