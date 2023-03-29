import { UserModel } from '@models';
import { InjectModel, Repository } from '@modules/objection';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from './interfaces';

@Injectable()
export class UserRepository
  extends Repository<UserModel>
  implements IUserRepository
{
  @InjectModel(UserModel)
  model: UserModel;

  static get tableName() {
    return UserModel.tableName;
  }
}
