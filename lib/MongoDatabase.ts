import { Mongoose, ConnectionOptions } from 'mongoose';
import { Database, Logger, DatabaseOptions } from './common';
import { maskAuthUrl } from './util';
import MongoDatabaseError from './base/MongoDatabaseError';
import BaseModel from './base/BaseModel';

export interface MongoDatabaseOptions extends DatabaseOptions {
  url?: string;
  logger?: Logger;
  mongoose?: Mongoose;
  mongooseOpts?: any;
  connectionOpts?: ConnectionOptions;
}

export default class MongoDatabase implements Database {
  protected logger: Logger;
  protected mongoose: Mongoose;

  public static RECONNECT_INTERVAL = 1000;
  public static MAX_RECONNECT_RETRIES = 10;

  /**
   * Instantiates a new Mongo Database, using Mongoose.
   * 
   * @param options The database options
   */
  constructor(public options: MongoDatabaseOptions = {}) {
    this.logger = this.options.logger;

    if (this.logger) {
      this.logger.info(`Initializing mongodb database`, { url: maskAuthUrl(options.url) });
    }
    this.mongoose = options.mongoose || new Mongoose({
      autoReconnect: true,
      reconnectTries: MongoDatabase.MAX_RECONNECT_RETRIES,
      reconnectInterval: MongoDatabase.RECONNECT_INTERVAL,
      ...this.options.mongooseOpts,
    });
  }

  /**
   * Connects to the remote database.
   *
   * @returns {Promise<void>}
   */
  public async connect(): Promise<MongoDatabaseOptions> {
    if (this.logger) {
      this.logger.silly(`Connecting to mongodb database`, { url: maskAuthUrl(this.options.url) });
    }

    try {
      await this.mongoose.connect(this.options.url, { 
        promiseLibrary: global.Promise,
        ...this.options.connectionOpts,
      });
    } catch (exception) {
      throw new MongoDatabaseError(exception.message, exception);
    }

    if (this.logger) {
      this.logger.silly(`Successfully connected to mongodb database`, { url: maskAuthUrl(this.options.url) });
    }

    return this.options;
  }

  /**
   * Disconnects the database.
   *
   * @returns {Promise<void>}
   */
  public async disconnect(): Promise<void> {
    if (this.logger) {
      this.logger.silly(`Disconnecting from mongodb database`, { url: maskAuthUrl(this.options.url) });
    }
    await this.mongoose.disconnect();
  }

  /**
   * Checks if the database is connected and ready for transactions.
   *
   * @returns {boolean}
   */
  public isReady(): boolean {
    return !!this.mongoose.connection.readyState;
  }

  /**
   * Gets or registers a moongoose model instance by its name or definition.
   *
   * @param {string} name The model name
   *
   * @returns {any}
   */
  public model<T extends BaseModel>(name: string | T | any): BaseModel {
    if (typeof name === 'string') {
      return this.mongoose.model(name) as any;
    } 
    if (name.Schema) {
      if (this.logger) {
        this.logger.silly(`Registering model in database: ${name.modelName}`);
      }
      return this.mongoose.model(name.modelName, name.Schema) as any;
    }

    // Schema is not defined, there's nothing left to do
    const n = name.modelName ? name.modelName : (name.name ? name.name : name);
    throw new MongoDatabaseError(`Cannot register the model "${n}": Schema is not defined. ` +
      `Make sure you have decorated the class with @Model(name, schema) or set the static Schema property.`);
  }
}