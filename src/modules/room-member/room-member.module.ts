import { Module } from '@nestjs/common';

import { RoomMemberRepositoryModule } from './repository/room-member.repository';
import { RoomMemberService } from './room-member.service';

@Module({
  imports: [RoomMemberRepositoryModule],
  controllers: [],
  providers: [RoomMemberService],
  exports: [RoomMemberService],
})
export class RoomMemberModule {}
