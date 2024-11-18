import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

import { getDBDefaultCollation } from '@/database/constants';

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
  @Prop({ required: true })
  createdBy!: string;
}

export const RoomSchema = SchemaFactory.createForClass(RoomModel);
