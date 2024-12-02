import { Module } from '@nestjs/common';

import { RoomService } from './room.service';
import { RoomRepositoryModule } from './repository/room.repository.module';

@Module({
  imports: [RoomRepositoryModule],
  controllers: [],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
