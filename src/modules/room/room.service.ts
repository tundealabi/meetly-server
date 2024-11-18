import { Injectable } from '@nestjs/common';

import { RoomRepository } from './repository/room.repository';
import { RoomModel } from './repository/schemas';
import { CreateRoomDto } from './dtos';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  // -------------------------------------------------------
  // CREATE ROOM
  // -------------------------------------------------------

  async create(dto: CreateRoomDto) {
    const createRoom: Partial<RoomModel> = {
      createdBy: dto.username,
    };
    return this.roomRepository.create(createRoom);
  }

  // -------------------------------------------------------
  // GET ROOM BY ID
  // -------------------------------------------------------

  async getRoomById(id: string) {
    return this.roomRepository.findOne({ _id: id });
  }
}
