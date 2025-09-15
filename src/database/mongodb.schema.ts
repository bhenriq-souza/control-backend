import { Collection, ObjectId, Document } from 'mongodb';

export class BaseSchema {
    constructor(public collection: Collection) {}

    async insert(document: Document): Promise<{ id: string }> {
        const result = await this.collection.insertOne(document);
        return { id: result.insertedId.toHexString() };
    }

    async getAll(): Promise<Document[]> {
        return await this.collection.find({}).toArray();
    }

    async getById(id: string): Promise<Document | null> {
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }

    async update(id: string, document: Partial<Document>): Promise<{ modifiedCount: number }> {
        const result = await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: document },
        );
        return { modifiedCount: result.modifiedCount };
    }

    async delete(id: string): Promise<{ deletedCount: number }> {
        const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
        return { deletedCount: result.deletedCount };
    }

    async query(pipeline: any): Promise<Document[] | []> {
        const cursor = this.collection.aggregate<Document>(pipeline);
        return await cursor.toArray();
    }
}
