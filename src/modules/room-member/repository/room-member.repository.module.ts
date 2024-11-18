import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RoomMemberDocument, RoomMemberModel } from './schemas';
import { EntityRepository } from '@/database/entity.repository';

@Injectable()
export class RoomMemberRepository extends EntityRepository<RoomMemberDocument> {
  constructor(
    @InjectModel(RoomMemberModel.name)
    private roomMemberModel: Model<RoomMemberDocument>,
  ) {
    super(roomMemberModel);
  }
}
