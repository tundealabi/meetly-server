import { registerAs } from '@nestjs/config';

type AuthConfigOptions = {
  accessToken: {
    expiresIn?: string;
    secret?: string;
  };
  google: {
    clientId?: string;
    clientSecret?: string;
  };
};

export default registerAs(
  'auth',
  (): AuthConfigOptions => ({
    accessToken: {
      expiresIn: process.env.AUTH_ACCESS_TOKEN_EXPIRES_IN,
      secret: process.env.AUTH_ACCESS_TOKEN_SECRET,
    },
    google: {
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    },
  }),
);
