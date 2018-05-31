import Server from 'ts-framework';
import { Logger } from 'ts-framework-mongo';
import MainDatabase from './MainDatabase';

// Prepare the database instance as soon as possible to prevent clashes in
// model registration. We can connect to the real database later.
const logger = new Logger({ level: 'silly' });
const database = MainDatabase.getInstance({ logger });

export default class MainServer extends Server {
  database: MainDatabase;

  constructor() {
    super({
      logger,
      secret: 'PLEASE_CHANGE_ME',
      port: process.env.PORT as any || 3000,
      controllers: require('./controllers').default,
      // sentry: {
      //   dsn: ''
      // }
    });
    this.database = database;
  }

  /**
   * Handles pre-startup routines, such as starting the database up.
   *
   * @returns {Promise<void>}
   */
  async onStartup(): Promise<void> {
    await this.database.connect();
    this.logger.info(`Server listening in port: ${this.config.port}`);
  }
}
