import { Injectable } from '@nestjs/common';

import { RoomRepository } from './repository/room.repository';
import { RoomModel } from './repository/schemas';
import { convertToMongoId } from '@/database/helpers';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  // -------------------------------------------------------
  // CREATE ROOM
  // -------------------------------------------------------

  async create(userId: string) {
    const createRoom: Partial<RoomModel> = {
      createdBy: convertToMongoId(userId),
    };
    return this.roomRepository.create(createRoom);
  }

  // -------------------------------------------------------
  // GET ROOM BY ID
  // -------------------------------------------------------

  async getRoomById(id: string) {
    const result = await this.roomRepository.findOne(
      { _id: id },
      {},
      {
        populate: { path: 'createdBy', select: ['_id', 'username'] },
      },
    );
    if (!result) return null;
    return result.toObject<{
      _id: string;
      createdBy: { _id: string; username: string };
    }>();
  }
}
