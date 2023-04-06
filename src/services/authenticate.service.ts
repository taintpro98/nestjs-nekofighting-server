import { REPOSITORIES } from '@constants';
import { LoginDefaultDto } from '@dtos';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@repositories/interfaces';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';

@Injectable()
export class AuthenticateService {
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async loginDefault(data: LoginDefaultDto) {
    const { username, password } = data;
    let user = await this.userRepository
      .query()
      .where('username', username)
      .first();
    if (!user) {
      user = await this.userRepository.create({
        username,
        password,
      });
    }
    return {
      access_token: await this.jwtService.signAsync(
        {
          id: user.id,
          username: user.username,
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
