import { inject, injectable } from 'tsyringe';
import { EnvService } from '../common';
import { BaseSchema, MongodbProvider } from '../database';
import { IUserRepository } from '../interfaces';
import { EnvServiceSymbol, MongodbProviderSymbol } from '../symbols';
import { UserEntity } from '../entities';

@injectable()
export class UserRepository extends BaseSchema implements IUserRepository {
    constructor(
        @inject(MongodbProviderSymbol) mongodb: MongodbProvider,
        @inject(EnvServiceSymbol) env: EnvService,
    ) {
        super(mongodb.getCollection(env.getEnv('USERS_COLLECTION')));
    }

    public async createUser(user: UserEntity): Promise<string> {
        const result = await this.collection.insertOne(user);
        return result.insertedId.toString();
    }
}
