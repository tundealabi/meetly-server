import { PickType } from '@nestjs/swagger';

export class RoomDetails {
  createdBy!: { _id: string; uid: number; username: string };
  roomName!: string;
}
export class Room extends RoomDetails {
  profilePicture!: string;
  rtcToken!: string;
  rtmToken!: string;
  screenShareRtcToken!: string;
  screenShareUid!: number;
  uid!: number;
  userId!: string;
  username!: string;
}
export class CreatedRoom extends PickType(RoomDetails, ['roomName']) {}
