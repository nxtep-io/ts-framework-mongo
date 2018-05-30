import { Model } from 'mongoose';

export default abstract class BaseModel extends Model {

  /**
   * Cleans the mongoose document for a JSON output, such as in RESTful APIs.
   */
  toJSON() {
    const json = super.toObject();
    if (json._id) {
      json.id = json._id;
      delete json._id;
    }
    if (json.hasOwnProperty('__v')) {
      delete json.__v;
    }
    return json;
  }
}