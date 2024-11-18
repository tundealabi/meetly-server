import { registerAs } from '@nestjs/config';

type VideoCallConfigOptions = {
  provider: {
    appCertificate?: string;
    appId?: string;
  };
};

export default registerAs(
  'videoCall',
  (): VideoCallConfigOptions => ({
    provider: {
      appCertificate: process.env.VIDEO_CALL_PROVIDER_APP_CERTIFICATE,
      appId: process.env.VIDEO_CALL_PROVIDER_APP_ID,
    },
  }),
);
