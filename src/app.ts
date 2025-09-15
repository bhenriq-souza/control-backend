import 'reflect-metadata';
import express from 'express';
import type { DependencyContainer } from 'tsyringe';

import { IApp } from './interfaces';
import { setupContainer } from './container';
import { UserRoutesSymbol } from './symbols';
import { UsersRoutes } from './routes';
import {
    loggingRequestMiddleware,
    correlationIdMiddleware,
    requestTimingMiddleware,
} from './middlewares';

type ExpressApp = ReturnType<typeof express>;

export class App implements IApp {
    private app?: ExpressApp = null;

    constructor() {}

    private buildAppRoutes(container: DependencyContainer): void {
        const app = express();

        app.use(express.json());

        /** Middlewares */
        app.use(correlationIdMiddleware);
        app.use(requestTimingMiddleware);
        app.use(loggingRequestMiddleware);

        /** Users Routes */
        const usersRoutes = container.resolve<UsersRoutes>(UserRoutesSymbol);
        app.use('/api/users', usersRoutes.getRouter());

        this.app = app;
    }

    public build(): ExpressApp {
        const container = setupContainer();

        if (!this.app) {
            this.buildAppRoutes(container);
        }

        return this.app!;
    }
}
