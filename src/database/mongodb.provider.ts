import { Collection, Db, Document, MongoClient } from 'mongodb';
import { inject, injectable } from 'tsyringe';

import { MongodbClientSymbol, MongodbDatabaseSymbol } from '../symbols';
import { IMongodbProvider } from '../interfaces';
import { MongoDbError } from '../types';

@injectable()
export class MongodbProvider implements IMongodbProvider {
    constructor(
        @inject(MongodbClientSymbol) private readonly mongodbClient: MongoClient,
        @inject(MongodbDatabaseSymbol) private readonly database: string,
    ) {}

    public getCollection(collectionName: string): Collection<Document> {
        try {
            const db: Db = this.mongodbClient.db(this.database);
            return db.collection(collectionName);
        } catch (error: any) {
            throw new MongoDbError('Erro ao obter coleção do MongoDB', error as Error);
        }
    }
}
