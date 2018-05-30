import * as mongoose from 'mongoose';
import { Logger, MongoDatabase } from '../lib';
import MongodbMemoryServer from 'mongodb-memory-server';

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

describe('lib.MongoDatabase', () => {
  let db;
  let mongod;
  let mongoUri;

  beforeAll(async () => {
    db = undefined;
    mongod = new MongodbMemoryServer();
    mongoUri = await mongod.getConnectionString();
  });

  afterAll(async () => {
    if(db) {
      await db.disconnect();
      db = undefined;
    }
    await mongod.stop();
  });

  it('should instantiate a simple database with logger', async () => {
    db = new MongoDatabase({ url: mongoUri, logger: new Logger() });
    await db.connect();
    expect(db.isReady()).toBe(true);
    await db.disconnect();
    expect(db.isReady()).toBe(false);
  });

  it('should instantiate a simple database', async () => {
    db = new MongoDatabase({ url: mongoUri });
    await db.connect();
    expect(db.isReady()).toBe(true);
    await db.disconnect();
    expect(db.isReady()).toBe(false);
  });

  it('should not connect to invalid url', async () => {
    expect.assertions(2);
    db = new MongoDatabase({ url: 'mongodb://abcde.efg:1234/invalid' });
    try {
      await db.connect();
    } catch (e) {
      expect(e).toHaveProperty('name', 'MongoDatabaseError');
      expect(e.message).toMatch(/failed to connect/);
    }
  });
});
