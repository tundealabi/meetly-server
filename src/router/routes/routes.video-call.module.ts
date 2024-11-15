import { Module } from '@nestjs/common';

import { VideoCallModule } from '@/modules/video-call/video-call.module';
import { VideoCallController } from '@/modules/video-call/video-call.controller';

@Module({
  controllers: [VideoCallController],
  exports: [],
  imports: [VideoCallModule],
  providers: [],
})
export class RoutesVideoCallModule {}
