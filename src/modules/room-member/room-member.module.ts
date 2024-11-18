import { Module } from '@nestjs/common';

import { RoomMemberRepositoryModule } from './repository/room-member.repository';

@Module({
  imports: [RoomMemberRepositoryModule],
  controllers: [],
  //   providers: [RoomMemberService],
})
export class RoomMemberModule {}
