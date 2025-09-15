import 'reflect-metadata';
import { container } from 'tsyringe';
import { UsersService } from './services';
import { UsersRoutes } from './routes';
import { UsersController } from './controllers';
import {
    EnvListSymbol,
    EnvServiceSymbol,
    HttpHelperSymbol,
    LoggerServiceSymbol,
    ProcessEnvSymbol,
    UserControllerSymbol,
    UserRoutesSymbol,
    UserServiceSymbol,
} from './symbols';
import { EnvService, LoggerService } from './common';
import { envList } from './configs/env.list';
import { HttpHelper } from './helpers';

export function setupContainer() {
    /* env */
    container.register(EnvListSymbol, { useValue: envList });
    container.registerInstance(ProcessEnvSymbol, process.env);
    container.register<EnvService>(EnvServiceSymbol, EnvService);

    /* logger */
    container.register<LoggerService>(LoggerServiceSymbol, LoggerService);

    /* http helper */
    container.register(HttpHelperSymbol, { useValue: HttpHelper });

    /* users */
    container.register<UsersService>(UserServiceSymbol, UsersService);
    container.register<UsersController>(UserControllerSymbol, UsersController);
    container.register<UsersRoutes>(UserRoutesSymbol, UsersRoutes);

    return container;
}
