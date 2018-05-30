/// <reference types="mongoose" />
import { Model } from 'mongoose';
export default abstract class BaseModel extends Model {
    /**
     * Cleans the mongoose document for a JSON output, such as in RESTful APIs.
     */
    toJSON(): any;
}
