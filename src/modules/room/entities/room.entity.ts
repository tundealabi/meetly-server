import { PickType } from '@nestjs/swagger';

export class RoomDetails {
  createdBy!: { _id: string; username: string };
  roomName!: string;
}
export class Room extends RoomDetails {
  token!: string;
  uid!: string;
  userId!: string;
  username!: string;
}
export class CreatedRoom extends PickType(RoomDetails, ['roomName']) {}
