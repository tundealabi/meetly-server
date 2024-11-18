import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RoomDocument, RoomModel } from './schemas';
import { EntityRepository } from '@/database/entity.repository';

@Injectable()
export class RoomRepository extends EntityRepository<RoomDocument> {
  constructor(
    @InjectModel(RoomModel.name) private roomModel: Model<RoomDocument>,
  ) {
    super(roomModel);
  }
}
