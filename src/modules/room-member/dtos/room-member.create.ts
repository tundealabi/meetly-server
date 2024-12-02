export class CreateRoomMemberDto {
  roomId!: string;
  token?: string;
  uid?: string;
  userId?: string;
  username!: string;
}
