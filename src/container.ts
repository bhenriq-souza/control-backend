import 'reflect-metadata';
import { container } from 'tsyringe';
import { MongoClient } from 'mongodb';

import { UsersRoutes } from './routes';
import { UsersService } from './services';
import { envList } from './configs/env.list';
import { UsersController } from './controllers';
import { EnvService, LoggerService } from './common';
import { MongodbProvider } from './database';
import { HttpHelper } from './helpers';
import { FirebaseAuthProvider } from './providers';
import { UserRepository } from './repositories';
import {
    EnvListSymbol,
    EnvServiceSymbol,
    FirebaseAuthProviderSymbol,
    HttpHelperSymbol,
    LoggerServiceSymbol,
    MongodbClientSymbol,
    MongodbDatabaseSymbol,
    MongodbProviderSymbol,
    ProcessEnvSymbol,
    UserControllerSymbol,
    UserRepositorySymbol,
    UserRoutesSymbol,
    UserServiceSymbol,
} from './symbols';

export async function setupContainer() {
    /* env */
    container.register(EnvListSymbol, { useValue: envList });
    container.registerInstance(ProcessEnvSymbol, process.env);
    container.register<EnvService>(EnvServiceSymbol, EnvService);
    const env = container.resolve<EnvService>(EnvServiceSymbol);

    /* logger */
    container.register<LoggerService>(LoggerServiceSymbol, LoggerService);

    /* http helper */
    container.register(HttpHelperSymbol, { useValue: HttpHelper });

    /* mongodb provider */
    const mongoDbUri = env.getEnv('MONGODB_URI');
    const mongoDbDatabase = env.getEnv('MONGODB_DB');
    container.registerInstance(MongodbClientSymbol, await new MongoClient(mongoDbUri).connect());
    container.register(MongodbDatabaseSymbol, { useValue: mongoDbDatabase });
    container.registerSingleton<MongodbProvider>(MongodbProviderSymbol, MongodbProvider);

    /* firebase auth */
    container.register<FirebaseAuthProvider>(FirebaseAuthProviderSymbol, FirebaseAuthProvider);

    /* users */
    container.register<UserRepository>(UserRepositorySymbol, UserRepository);
    container.register<UsersService>(UserServiceSymbol, UsersService);
    container.register<UsersController>(UserControllerSymbol, UsersController);
    container.register<UsersRoutes>(UserRoutesSymbol, UsersRoutes);

    return container;
}
