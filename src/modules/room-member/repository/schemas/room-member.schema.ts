import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

import { RoomModel } from '@/modules/room/repository/schemas';
import { UserModel } from '@/modules/user/repository/schemas';

export type RoomMemberDocument = HydratedDocument<RoomMemberModel>;

@Schema({
  collection: 'roomMembers',
  timestamps: true,
})
export class RoomMemberModel {
  @Prop({ auto: true, type: SchemaTypes.ObjectId })
  _id!: Types.ObjectId;

  @Prop({ ref: RoomModel.name, required: true, type: SchemaTypes.ObjectId })
  room!: Types.ObjectId;

  @Prop({ default: '' })
  token!: string;

  @Prop({ default: '' })
  uid!: string;

  @Prop({ ref: UserModel.name, type: SchemaTypes.ObjectId })
  user?: Types.ObjectId;

  @Prop({ required: true })
  username!: string;
}

export const RoomMemberSchema = SchemaFactory.createForClass(RoomMemberModel);
