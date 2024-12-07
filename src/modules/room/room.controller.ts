import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JoinRoomDto, JoinRoomParam } from './dtos';
import { CreatedRoom, Room, RoomDetails } from './entities';
import { RoomService } from './room.service';
import { RoomMemberService } from '../room-member/room-member.service';
import { VideoCallService } from '../video-call/video-call.service';
import { controllerResponse } from '@/common/helpers';
import { UserAuthJwtAuthGuard } from '../auth/guards';
import { GetDataFromRequestUser } from '../auth/decorators';
import { UserService } from '../user/user.service';
import { UserModel } from '../user/repository/schemas';

@Controller()
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly roomMemberService: RoomMemberService,
    private readonly userService: UserService,
    private readonly vcService: VideoCallService,
  ) {}

  private readonly logger = new Logger(RoomController.name);

  // -------------------------------------------------------
  // CREATE ROOM
  // -------------------------------------------------------

  @Post()
  @UseGuards(UserAuthJwtAuthGuard)
  async createRoom(@GetDataFromRequestUser('sub') userId: string) {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User account not found');
    }
    const newRoom = await this.roomService.create(userId);

    return controllerResponse<CreatedRoom>({
      data: {
        roomName: newRoom.id,
      },
      message: 'Room created successfully',
    });
  }

  // -------------------------------------------------------
  // JOIN ROOM
  // -------------------------------------------------------
  @Post(':id/join')
  @UseGuards(UserAuthJwtAuthGuard)
  async joinRoom(
    @GetDataFromRequestUser('sub') userId: string,
    @Param() params: JoinRoomParam,
  ) {
    const room = await this.roomService.getRoomById(params.id);

    if (!room) throw new NotFoundException('Room does not exist');
    // console.log()
    const existingRoomMember =
      await this.roomMemberService.findRoomMemberByUserId(room._id, userId);

    this.logger.debug(
      {
        data: existingRoomMember,
        message: 'existingRoomMember',
      },
      'RoomController.joinRoom',
    );

    if (existingRoomMember) {
      const user = existingRoomMember.user as unknown as null | UserModel;
      return controllerResponse<Room>({
        data: {
          createdBy: room.createdBy,
          profilePicture: user?.profilePicture ?? '',
          roomName: room._id,
          rtcToken: existingRoomMember.rtcToken,
          rtmToken: existingRoomMember.rtmToken,
          screenShareRtcToken: existingRoomMember.screenShareRtcToken,
          screenShareUid: existingRoomMember.screenShareUid,
          uid: existingRoomMember.uid,
          userId: existingRoomMember._id.toHexString(),
          username: existingRoomMember.username,
        },
        message: 'Room joined successfully',
      });
    }

    const user = await this.userService.findUserById(userId);

    if (!user) throw new NotFoundException('User does not exist');

    const session = this.vcService.createSession({
      expirationTimeInSeconds: 32424,
      roomName: room._id,
    });

    this.logger.debug(
      {
        data: session,
        message: 'session',
      },
      'RoomController.joinRoom',
    );

    const newRoomMember = await this.roomMemberService.create({
      roomId: room._id,
      rtcToken: session.userRtcToken,
      rtmToken: session.userRtmToken,
      screenShareRtcToken: session.screenShareToken,
      screenShareUid: session.screenShareUid,
      uid: session.userUid,
      userId,
      username: user.username,
    });

    return controllerResponse<Room>({
      data: {
        createdBy: room.createdBy,
        profilePicture: user.profilePicture ?? '',
        roomName: room._id,
        rtcToken: session.userRtcToken,
        rtmToken: session.userRtmToken,
        screenShareRtcToken: session.screenShareToken,
        screenShareUid: session.screenShareUid,
        uid: session.userUid,
        userId: newRoomMember.id,
        username: newRoomMember.username,
      },
      message: 'Room joined successfully',
    });
  }

  // -------------------------------------------------------
  // JOIN ROOM AS A GUEST
  // -------------------------------------------------------

  @Post(':id/guest-join')
  async joinRoomAsGuest(
    @Param() params: JoinRoomParam,
    @Body() dto: JoinRoomDto,
  ) {
    const room = await this.roomService.getRoomById(params.id);
    if (!room) {
      throw new NotFoundException('Room does not exist');
    }

    const session = this.vcService.createSession({
      expirationTimeInSeconds: 32424,
      roomName: room._id,
    });

    const newRoomMember = await this.roomMemberService.create({
      roomId: room._id,
      rtcToken: session.userRtcToken,
      rtmToken: session.userRtmToken,
      screenShareRtcToken: session.screenShareToken,
      screenShareUid: session.screenShareUid,
      uid: session.userUid,
      username: dto.username,
    });

    return controllerResponse<Room>({
      data: {
        createdBy: room.createdBy,
        profilePicture: '',
        roomName: room._id,
        rtcToken: session.userRtcToken,
        rtmToken: session.userRtmToken,
        screenShareRtcToken: session.screenShareToken,
        screenShareUid: session.screenShareUid,
        uid: session.userUid,
        userId: newRoomMember.id,
        username: newRoomMember.username,
      },
      message: 'Room joined successfully',
    });
  }

  // -------------------------------------------------------
  // GET ROOM
  // -------------------------------------------------------

  @Get(':id')
  async getRoom(@Param() params: JoinRoomParam) {
    const room = await this.roomService.getRoomById(params.id);
    if (!room) {
      throw new NotFoundException('Room does not exist');
    }

    this.logger.debug(
      {
        data: room,
        message: 'room',
      },
      'RoomController.getRoom',
    );

    return controllerResponse<RoomDetails>({
      data: {
        createdBy: room.createdBy,
        // roomMembers: [],
        roomName: room._id,
      },
      message: 'Room details fetched successfully',
    });
  }
}
