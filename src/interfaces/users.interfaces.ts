import type { Response, Request } from 'express';
import { CreateUserResponse, GreetResponse } from '../types';
import { UserEntity } from '../entities';

export interface IUserService {
    sayHello(): { message: string };
    createUser(
        name: string,
        username: string,
        profile: string,
        modifierId?: string,
    ): Promise<string>;
}

export interface IUserController {
    greet(_req: Request, res: Response): Response<GreetResponse>;
    createUser(req: Request, res: Response): Promise<Response<CreateUserResponse>>;
}

export interface IUserRepository {
    createUser(user: UserEntity): Promise<string>;
}
