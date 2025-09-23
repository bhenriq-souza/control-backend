import 'reflect-metadata';
import { container } from 'tsyringe';
import { MongoClient } from 'mongodb';

import { BanksRoutes, UsersRoutes } from './routes';
import { BanksService, UsersService } from './services';
import { envList } from './configs/env.list';
import { BanksController, UsersController } from './controllers';
import { EnvService, LoggerService } from './common';
import { MongodbProvider } from './database';
import { HttpHelper } from './helpers';
import { FirebaseAuthProvider } from './providers';
import { BanksRepository, UserRepository } from './repositories';
import {
    BankControllerSymbol,
    BankServiceSymbol,
    BanksRepositorySymbol,
    BanksRoutesSymbol,
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

    /* banks */
    container.register<BanksRoutes>(BanksRoutesSymbol, BanksRoutes);
    container.register<BanksRepository>(BanksRepositorySymbol, BanksRepository);
    container.register<BanksService>(BankServiceSymbol, BanksService);
    container.register<BanksController>(BankControllerSymbol, BanksController);

    return container;
}
