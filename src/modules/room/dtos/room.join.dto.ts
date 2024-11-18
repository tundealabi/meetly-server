import { PickType } from '@nestjs/swagger';

import { CreateRoomDto } from './room.create.dto';
import { IsMongoId } from 'class-validator';

export class JoinRoomDto extends PickType(CreateRoomDto, ['username']) {}

export class JoinRoomParam {
  @IsMongoId({ message: 'Invalid Id' })
  id!: string;
}
