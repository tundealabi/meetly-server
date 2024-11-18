import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomRepository } from './room.repository';
import { RoomModel, RoomSchema } from './schemas';

@Module({
  controllers: [],
  exports: [RoomRepository],
  imports: [
    MongooseModule.forFeature([{ name: RoomModel.name, schema: RoomSchema }]),
  ],
  providers: [RoomRepository],
})
export class RoomRepositoryModule {}
