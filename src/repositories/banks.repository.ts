import { inject, injectable } from 'tsyringe';

import type { IBankRepository, IEnvService, IMongodbProvider } from '../interfaces';

import { BaseSchema } from '../database';
import { EnvServiceSymbol, MongodbProviderSymbol } from '../symbols';

@injectable()
export class BanksRepository extends BaseSchema implements IBankRepository {
    constructor(
        @inject(EnvServiceSymbol) env: IEnvService,
        @inject(MongodbProviderSymbol) mongodb: IMongodbProvider,
    ) {
        super(mongodb.getCollection(env.getEnv('BANKS_COLLECTION')));
    }
}
