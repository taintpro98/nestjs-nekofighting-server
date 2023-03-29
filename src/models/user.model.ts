import { BaseModel } from '@modules/objection';

class UserModel extends BaseModel {
  static tableName = 'users';
  static connection = 'postgres';
  static useUUID = true;

  id: string;
  username: string;
  password: string;

  static jsonSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      username: { type: 'string' },
      password: { type: 'string' },
    },
  };
}

export default UserModel;
