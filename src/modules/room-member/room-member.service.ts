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
      token: dto.token,
      uid: dto.uid,
      user: dto.userId ? convertToMongoId(dto.userId) : undefined,
      username: dto.username,
    };
    return this.roomMemberRepository.create(createRoomMember);
  }

  // -------------------------------------------------------
  // FIND ROOM MEMBER BY USER ID
  // -------------------------------------------------------

  async findRoomMemberByUserId(roomId: string, userId: string) {
    return this.roomMemberRepository.findOne({
      room: roomId,
      user: userId,
    });
  }

  // -------------------------------------------------------
  // UPDATE ROOM MEMBER
  // -------------------------------------------------------

  async update(id: string, dto: Partial<CreateRoomMemberDto>) {
    return this.roomMemberRepository.findOneAndUpdate(
      { _id: convertToMongoId(id) },
      { ...dto },
    );
  }
}
