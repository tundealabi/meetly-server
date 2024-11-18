import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomMemberRepository } from './room-member.repository.module';
import { RoomMemberModel, RoomMemberSchema } from './schemas';

@Module({
  controllers: [],
  exports: [RoomMemberRepository],
  imports: [
    MongooseModule.forFeature([
      { name: RoomMemberModel.name, schema: RoomMemberSchema },
    ]),
  ],
  providers: [RoomMemberRepository],
})
export class RoomMemberRepositoryModule {}
