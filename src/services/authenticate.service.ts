import { REPOSITORIES } from '@constants';
import { RegisterNormalDto } from '@dtos';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@repositories/interfaces';
import { UserTransformer } from '@transformers';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';

@Injectable()
export class AuthenticateService {
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    @Inject(UserTransformer)
    private readonly userTransformer: UserTransformer,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async registerNormal(data: RegisterNormalDto) {
    let user = await this.userRepository.create({
      username: data.username,
      password: data.password,
    });
    user = await this.userRepository.with(user, '');
    return {
      access_token: await this.jwtService.signAsync(
        {
          id: user.id,
          username: user.username
        },
        {
          expiresIn: ms(
            this.configService.get<string>('auth.auth.access_token_lifetime'),
          ),
        },
      ),
      expires_in: ms(
        this.configService.get<string>('auth.auth.access_token_lifetime'),
      ),
      token_type: 'Bearer',
    };
  }
}
