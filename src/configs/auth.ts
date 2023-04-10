import { registerAs } from '@nestjs/config';

export const configAuth = registerAs('auth', () => ({
  key: {
    verified_message: process.env.VERIFIED_MESSAGE,
    token_secret_key: process.env.TOKEN_SECRET_KEY,
  },
  auth: {
    refresh_token_lifetime: '14 days',
    access_token_lifetime: '7 days',
    oauth_authorization_url: process.env.OAUTH_AUTHORIZATION_URL,
    client_id: process.env.CLIENT_ID
  }
}));
