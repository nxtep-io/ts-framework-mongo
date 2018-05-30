import { BaseError } from '../common';
export default class MongoDatabaseError extends BaseError {
    constructor(message?: string, details?: any);
}
