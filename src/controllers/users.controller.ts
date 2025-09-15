import express from 'express';
import { inject, injectable } from 'tsyringe';

import { HttpHelper } from '../helpers';
import { IUserController } from '../interfaces';
import type { ILogger, IUserService } from '../interfaces';
import { HttpHelperSymbol, LoggerServiceSymbol, UserServiceSymbol } from '../symbols';
import { GreetResponse } from '../types';

@injectable()
export class UsersController implements IUserController {
    constructor(
        @inject(UserServiceSymbol) private readonly userService: IUserService,
        @inject(HttpHelperSymbol) private readonly http: typeof HttpHelper,
        @inject(LoggerServiceSymbol) private readonly logger: ILogger,
    ) {}

    greet(_req: express.Request, res: express.Response): express.Response<GreetResponse> {
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
}
