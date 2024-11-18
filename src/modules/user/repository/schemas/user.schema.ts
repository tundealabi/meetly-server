import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

import { getDBDefaultCollation } from '@/database/constants';

export type UserDocument = HydratedDocument<UserModel>;

@Schema({
  collation: getDBDefaultCollation(),
  collection: 'users',
  timestamps: true,
})
export class UserModel {
  @Prop({ auto: true, type: SchemaTypes.ObjectId })
  _id!: Types.ObjectId;

  @Prop({ required: true, unique: true })
  socialAuthId!: string;

  @Prop({ lowercase: true, required: true, unique: true })
  email!: string;

  @Prop({ default: '' })
  profilePicture!: string;

  @Prop({ required: true })
  username!: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
