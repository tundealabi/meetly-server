import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { JWTUser } from './entities';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async getGoogleUser(authToken: string) {
    try {
      const client = new OAuth2Client({
        clientId: this.configService.getOrThrow('auth.google.clientId'),
        clientSecret: this.configService.getOrThrow('auth.google.clientSecret'),
      });
      const ticket = await client.verifyIdToken({
        idToken: authToken,
        audience: [this.configService.getOrThrow('auth.google.clientId')],
      });
      return ticket.getPayload();
    } catch (err: any) {
      this.logger.error(
        {
          error: err,
          message: err.message,
        },
        'AuthService.getGoogleUser',
      );
      return null;
    }
  }

  // -------------------------------------------------------
  // CREATE AUTH ACCESS TOKEN
  // -------------------------------------------------------

  async createAccessToken(payload: JWTUser) {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow<string>(
        'auth.accessToken.expiresIn',
      ),
      secret: this.configService.getOrThrow<string>('auth.accessToken.secret'),
    });
  }
}
