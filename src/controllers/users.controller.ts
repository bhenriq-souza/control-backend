import { inject, injectable } from 'tsyringe';

import { HttpHelper } from '../helpers';
import { IUserController } from '../interfaces';
import type { ILogger, IUserService } from '../interfaces';
import { HttpHelperSymbol, LoggerServiceSymbol, UserServiceSymbol } from '../symbols';
import { CreateUserResponse, GreetResponse } from '../types';

import type { Response, Request } from 'express';

@injectable()
export class UsersController implements IUserController {
    constructor(
        @inject(UserServiceSymbol) private readonly userService: IUserService,
        @inject(HttpHelperSymbol) private readonly http: typeof HttpHelper,
        @inject(LoggerServiceSymbol) private readonly logger: ILogger,
    ) {}

    greet(_req: Request, res: Response): Response<GreetResponse> {
        try {
            this.logger.info('Greet method called in UsersController');

            const data = this.userService.sayHello();

            return this.http.ok<GreetResponse>(res, data);
        } catch (error) {
            if (error instanceof Error && error.message && error.stack) {
                this.logger.error(`Error in greet method: ${error.message}`, {
                    stack: error.stack,
                });
                return this.http.fail(res, 500, error.message, { stack: error.stack });
            }

            this.logger.error('Unknown error in greet method');
            return this.http.fail(res, 500, 'An unknown error occurred');
        }
    }

    async createUser(req: Request, res: Response): Promise<Response<CreateUserResponse>> {
        try {
            this.logger.info('CreateUser method called in UsersController');

            const { name, username } = req.body;

            const userId = await this.userService.createUser(name, username, 'standard', 'system');

            return this.http.created<CreateUserResponse>(res, { userId, username });
        } catch (error) {
            if (error instanceof Error && error.message && error.stack) {
                this.logger.error(`Error in createUser method: ${error.message}`, {
                    stack: error.stack,
                });
                return this.http.fail(res, 500, error.message, { stack: error.stack });
            }

            this.logger.error('Unknown error in createUser method');
            return this.http.fail(res, 500, 'An unknown error occurred');
        }
    }
}
