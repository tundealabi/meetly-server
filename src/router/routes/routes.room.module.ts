import { Module } from '@nestjs/common';

import { RoomController } from '@/modules/room/room.controller';
import { RoomModule } from '@/modules/room/room.module';
import { UserModule } from '@/modules/user/user.module';
import { VideoCallModule } from '@/modules/video-call/video-call.module';
import { RoomMemberModule } from '@/modules/room-member/room-member.module';

@Module({
  controllers: [RoomController],
  exports: [],
  imports: [RoomModule, RoomMemberModule, UserModule, VideoCallModule],
  providers: [],
})
export class RoutesRoomModule {}
