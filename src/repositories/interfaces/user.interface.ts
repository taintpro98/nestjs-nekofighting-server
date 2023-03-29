import { UserModel } from '@models';
import { IRepository } from '@modules/objection';

export type IUserRepository = IRepository<UserModel>;
