import { BaseSchema } from 'ts-framework-mongo';

const UserSchema = new BaseSchema({
  name: String,
  email: String,
  password: String,
},                            { 
  timestamps: { createdAt: true, updatedAt: true },
});

export default UserSchema;
