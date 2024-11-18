import { Injectable } from '@nestjs/common';

import { CreateRoomMemberDto } from './dtos';
import { RoomMemberRepository } from './repository/room-member.repository.module';
import { RoomMemberModel } from './repository/schemas';
import { convertToMongoId } from '@/database/helpers';

// import { RoomModel } from './repository/schemas';

@Injectable()
export class RoomMemberService {
  constructor(private readonly roomMemberRepository: RoomMemberRepository) {}

  // -------------------------------------------------------
  // CREATE ROOM MEMBER
  // -------------------------------------------------------

  async create(dto: CreateRoomMemberDto) {
    const createRoomMember: Partial<RoomMemberModel> = {
      room: convertToMongoId(dto.roomId),
      username: dto.username,
    };
    return this.roomMemberRepository.create(createRoomMember);
  }
}
