import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

import { RoomModel } from '@/modules/room/repository/schemas';

export type RoomMemberDocument = HydratedDocument<RoomMemberModel>;

@Schema({
  collection: 'roomMembers',
  timestamps: true,
})
export class RoomMemberModel {
  @Prop({ auto: true, type: SchemaTypes.ObjectId })
  _id!: Types.ObjectId;

  @Prop({ ref: RoomModel.name, type: SchemaTypes.ObjectId })
  room!: Types.ObjectId;

  @Prop({ required: true })
  username!: string;
}

export const RoomMemberSchema = SchemaFactory.createForClass(RoomMemberModel);
