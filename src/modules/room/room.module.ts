import { Module } from '@nestjs/common';

import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { RoomRepositoryModule } from './repository/room.repository.module';

@Module({
  imports: [RoomRepositoryModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
