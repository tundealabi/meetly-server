import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

import { getDBDefaultCollation } from '@/database/constants';
import { UserModel } from '@/modules/user/repository/schemas';

export type RoomDocument = HydratedDocument<RoomModel>;

@Schema({
  collation: getDBDefaultCollation(),
  collection: 'rooms',
  timestamps: true,
})
export class RoomModel {
  @Prop({ auto: true, type: SchemaTypes.ObjectId })
  _id!: Types.ObjectId;

  // @Prop({ required: true })
  // dueDate: string;
  @Prop({ ref: UserModel.name, required: true, type: SchemaTypes.ObjectId })
  createdBy!: Types.ObjectId;
}

export const RoomSchema = SchemaFactory.createForClass(RoomModel);
