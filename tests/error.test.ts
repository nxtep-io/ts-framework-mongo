import { MongoDatabaseError } from '../lib';

describe('lib.MongoDatabase.MongoDatabaseError', () => {

  it('should instantiate a simple error', async () => {
    expect(() => {
      throw new MongoDatabaseError();
    }).toThrow(/Mongo database error/)
  });

});
