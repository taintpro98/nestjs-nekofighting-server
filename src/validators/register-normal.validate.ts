import { REPOSITORIES } from '@constants';
import { RegisterNormalDto } from '@dtos';
import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { IUserRepository } from '@repositories/interfaces';

@Injectable()
export class RegisterNormalValidationPipe
  implements PipeTransform<RegisterNormalDto>
{
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async transform(value: RegisterNormalDto, metadata: ArgumentMetadata) {
    const { username } = value;
    const user = await this.userRepository
      .query()
      .where('username', username)
      .first();
    if (user) throw new BadRequestException(`Username ${username} existed`);
    return value;
  }
}
