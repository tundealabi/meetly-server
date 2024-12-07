export class CreateRoomMemberDto {
  roomId!: string;
  rtcToken?: string;
  rtmToken?: string;
  screenShareRtcToken?: string;
  screenShareUid?: number;
  uid?: number;
  userId?: string;
  username!: string;
}
