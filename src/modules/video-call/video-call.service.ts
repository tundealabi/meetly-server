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

  generateToken(dto: GenerateTokenDto) {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const tokenAndPrivilegeExpiresTs =
      currentTimestamp + dto.expirationTimeInSeconds;

    const token = RtcTokenBuilder.buildTokenWithUid(
      this.appId,
      this.appCertificate,
      dto.roomName,
      dto.userUId,
      RtcRole.PUBLISHER,
      tokenAndPrivilegeExpiresTs,
      tokenAndPrivilegeExpiresTs,
    );
    return token;
  }
}
