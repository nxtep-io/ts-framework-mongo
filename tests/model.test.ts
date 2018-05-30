import MongodbMemoryServer from 'mongodb-memory-server';
import { BaseModel, Logger, BaseSchema, MongoDatabase } from '../lib';

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

describe('lib.MongoDatabase.Model', () => {
  let db;
  let mongoUri;
  let mongoServer;

  beforeAll(async () => {
    mongoServer = (new MongodbMemoryServer());
    mongoUri = await mongoServer.getConnectionString();
    db = new MongoDatabase({ url: mongoUri, logger: new Logger() });
    await db.connect();
    expect(db.isReady()).toBe(true);
  });

  afterAll(async () => {
    await db.disconnect();
    await mongoServer.stop();
  });

  it('should instantiate a simple model');
});
