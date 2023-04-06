import { configDb } from '@configs/database';
import { REPOSITORIES } from '@constants';
import {
  AccountController,
  AppController,
  AuthenticateController,
} from '@controllers';
import { ObjectionModule } from '@modules/objection';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticateService, UserService } from '@services';
import { UserTransformer } from '@transformers';
import { UserRepository } from '@repositories';
import { configAuth } from '@configs/auth';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@passports';
import { ConfigAppService } from '@configs/app-configs';

const controllers = [AppController, AuthenticateController, AccountController];

const services = [AuthenticateService, UserService];

const repositories = [
  {
    provide: REPOSITORIES.USER_REPOSITORY,
    useClass: UserRepository,
  },
];

const transformers = [UserTransformer];

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configDb, configAuth],
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('auth.key.token_secret_key'),
      }),
      inject: [ConfigService],
    }),
    ObjectionModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('db'),
      inject: [ConfigService],
    }),
  ],
  controllers,
  providers: [
    ConfigAppService,
    JwtStrategy,
    ...services,
    ...repositories,
    ...transformers,
  ],
})
export class AppModule {}
