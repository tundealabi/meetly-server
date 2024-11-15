import { registerAs } from '@nestjs/config';

type AuthConfigOptions = {
  accessToken: {
    expiresIn?: string;
    secret?: string;
  };
};

export default registerAs(
  'auth',
  (): AuthConfigOptions => ({
    accessToken: {
      expiresIn: process.env.AUTH_ACCESS_TOKEN_EXPIRES_IN,
      secret: process.env.AUTH_ACCESS_TOKEN_SECRET,
    },
  }),
);
