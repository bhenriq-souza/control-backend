import express from 'express';
import { GreetResponse } from '../types';

export interface IUserService {
    sayHello(): { message: string };
}

export interface IUserController {
    greet(_req: express.Request, res: express.Response): express.Response<GreetResponse>;
}
