/// <reference types="mongoose" />
import { Mongoose, ConnectionOptions } from 'mongoose';
import { Database, Logger, DatabaseOptions } from './common';
export interface MongoDatabaseOptions extends DatabaseOptions {
    url?: string;
    mongoose?: Mongoose;
    mongooseOpts?: ConnectionOptions;
}
export default class MongoDatabase implements Database {
    options: MongoDatabaseOptions;
    protected logger: Logger;
    protected mongoose: Mongoose;
    static RECONNECT_INTERVAL: number;
    static MAX_RECONNECT_RETRIES: number;
    /**
     * Instantiates a new Mongo Database, using Mongoose.
     *
     * @param options The database options
     */
    constructor(options?: MongoDatabaseOptions);
    /**
     * Connects to the remote database.
     *
     * @returns {Promise<void>}
     */
    connect(): Promise<MongoDatabaseOptions>;
    /**
     * Disconnects the database.
     *
     * @returns {Promise<void>}
     */
    disconnect(): Promise<void>;
    /**
     * Checks if the database is connected and ready for transactions.
     *
     * @returns {boolean}
     */
    isReady(): boolean;
}
