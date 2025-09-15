import express from 'express';
import { injectable, container } from 'tsyringe';

import { IBaseRoute } from '../interfaces';
import { UserControllerSymbol } from '../symbols';
import { UsersController } from '../controllers';

type UserRouter = ReturnType<typeof express.Router>;

@injectable()
export class UsersRoutes implements IBaseRoute {
    router?: UserRouter = null;

    constructor() {}

    private registerRoutes(): void {
        this.router = express.Router();

        this.router.get('/greet', (req, res) => {
            const ctrl = container.resolve<UsersController>(UserControllerSymbol);
            return ctrl.greet(req, res);
        });
    }

    public getRouter(): UserRouter {
        if (!this.router) {
            this.registerRoutes();
        }
        return this.router;
    }
}
