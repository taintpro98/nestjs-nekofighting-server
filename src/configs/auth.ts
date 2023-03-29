import { registerAs } from '@nestjs/config';

export const configAuth = registerAs('auth', () => ({
  key: {
    verified_message: process.env.VERIFIED_MESSAGE,
    token_secret_key: process.env.TOKEN_SECRET_KEY,
  },
  auth: {
    refresh_token_lifetime: '14 days',
    access_token_lifetime: '7 days',
  },
}));
