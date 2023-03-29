import { configDb } from '@configs/database';
import { REPOSITORIES } from '@constants';
import { AppController, AuthenticateController } from '@controllers';
import { ObjectionModule } from '@modules/objection';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticateService } from '@services';
import { UserTransformer } from '@transformers';
import { UserRepository } from '@repositories';
import { configAuth } from '@configs/auth';
import { JwtModule } from '@nestjs/jwt';

const controllers = [AppController, AuthenticateController];

const services = [AuthenticateService];

const repositories = [
  {
    provide: REPOSITORIES.USER_REPOSITORY,
    useClass: UserRepository,
  },
];

const transformers = [UserTransformer];

@Module({
  imports: [
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
  providers: [...services, ...repositories, ...transformers],
})
export class AppModule {}
