import { UserModel } from '@models';
import { Injectable } from '@nestjs/common';
import { Transformer } from './transformer';

@Injectable()
export class UserTransformer extends Transformer<UserModel> {
  async transform(model: UserModel): Promise<Record<string, any>> {
    return {
      id: model.id,
      username: model.username,
    };
  }
}
