export class MongoDbError extends Error {
    public error?: Error;
    constructor(message: string, error?: Error) {
        super(message);
        this.name = 'MongoDbError';
        this.error = error;
        Object.setPrototypeOf(this, MongoDbError.prototype);
    }
}
