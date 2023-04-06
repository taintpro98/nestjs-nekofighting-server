import { REPOSITORIES } from '@constants';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@repositories/interfaces';
import { UserTransformer } from '@transformers';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    @Inject(UserTransformer)
    private readonly userTransformer: UserTransformer,
  ) {}

  async getUserProfile(userId: string) {
    let user = await this.userRepository.findById(userId);
    let response = await this.userTransformer.collection([user], {
      include: '',
    });
    return response[0];
  }
}
