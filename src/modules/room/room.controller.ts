import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import { CreateRoomDto, JoinRoomDto, JoinRoomParam } from './dtos';
import { Room } from './entities';
import { RoomService } from './room.service';
import { RoomMemberService } from '../room-member/room-member.service';
import { VideoCallService } from '../video-call/video-call.service';
import { controllerResponse } from '@/common/helpers';

@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly roomMemberService: RoomMemberService,
    private readonly vcService: VideoCallService,
  ) {}

  // -------------------------------------------------------
  // CREATE ROOM
  // -------------------------------------------------------

  async createRoom(@Body() dto: CreateRoomDto) {
    const newRoom = await this.roomService.create(dto);
    const newRoomMember = await this.roomMemberService.create({
      roomId: newRoom.id,
      username: newRoom.createdBy,
    });
    const token = this.vcService.generateToken({
      expirationTimeInSeconds: 660,
      roomName: newRoom.id,
      userUId: newRoomMember.id,
    });
    return controllerResponse<Room>({
      data: {
        createdBy: newRoom.createdBy,
        // roomMembers: [],
        roomName: newRoom.id,
        token,
        userId: newRoomMember.id,
      },
      message: 'Room created successfully',
    });
  }

  // -------------------------------------------------------
  // JOIN ROOM
  // -------------------------------------------------------
  @Post(':id/join')
  async getTask(@Param() params: JoinRoomParam, @Body() dto: JoinRoomDto) {
    const room = await this.roomService.getRoomById(params.id);
    if (!room) {
      throw new NotFoundException('Room does not exist');
    }
    const newRoomMember = await this.roomMemberService.create({
      roomId: room.id,
      username: dto.username,
    });

    const token = this.vcService.generateToken({
      expirationTimeInSeconds: 32424,
      roomName: room.id,
      userUId: newRoomMember.id,
    });
    return controllerResponse<Room>({
      data: {
        createdBy: room.createdBy,
        // roomMembers: [],
        roomName: room.id,
        token,
        userId: newRoomMember.id,
      },
      message: 'Room joined successfully',
    });
  }
}
