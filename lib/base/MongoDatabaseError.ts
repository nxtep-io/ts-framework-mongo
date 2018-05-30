import { BaseError } from '../common';

export default class MongoDatabaseError extends BaseError {
  constructor(message?: string, details: any = {}) {
    super(message || 'Unknown Mongo database error', details);
  }
}