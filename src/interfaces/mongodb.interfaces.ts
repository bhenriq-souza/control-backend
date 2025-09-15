import { Collection, Document } from 'mongodb';

export interface IMongodbProvider {
    getCollection(collectionName: string): Collection<Document>;
}
