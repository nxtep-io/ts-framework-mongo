import { Model, BaseModel } from 'ts-framework-mongo';
import MainDatabase from '../../MainDatabase';
import UserSchema from './UserSchema';

@Model('Users')
class UserModel extends BaseModel {
  static Schema = UserSchema;
}

export default MainDatabase.model(UserModel);
