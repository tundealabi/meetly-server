import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RtcRole, RtcTokenBuilder } from 'agora-token';

import { GenerateTokenDto } from './dtos';

@Injectable()
export class VideoCallService {
  constructor(private readonly configService: ConfigService) {}

  private appCertificate = this.configService.getOrThrow<string>(
    'videoCall.provider.appCertificate',
  );

  private appId = this.configService.getOrThrow<string>(
    'videoCall.provider.appId',
  );

  // -------------------------------------------------------
  // GENERATE TOKEN FOR VIDEO CALL
  // -------------------------------------------------------

  createSession(dto: GenerateTokenDto) {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const tokenAndPrivilegeExpiresTs =
      currentTimestamp + dto.expirationTimeInSeconds;

    const uid = this.generateUid().toString();

    const token = RtcTokenBuilder.buildTokenWithUid(
      this.appId,
      this.appCertificate,
      dto.roomName,
      uid,
      RtcRole.PUBLISHER,
      tokenAndPrivilegeExpiresTs,
      tokenAndPrivilegeExpiresTs,
    );
    return {
      token,
      uid,
    };
  }

  // -------------------------------------------------------
  // GENERATE UID FOR VIDEO CALL
  // -------------------------------------------------------

  /**
   * Generates a random integer between 1 and 10,000.
   * @returns {number} A random integer between 1 and 10,000.
   */
  private generateUid(): number {
    return Math.floor(Math.random() * 10000) + 1;
  }
}
