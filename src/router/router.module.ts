import { Module } from '@nestjs/common';
import { RouterModule as NestRouterModule } from '@nestjs/core';
import {
  RoutesAuthModule,
  RoutesRoomModule,
  RoutesVideoCallModule,
} from './routes';

@Module({
  imports: [
    NestRouterModule.register([
      { path: 'rooms', module: RoutesRoomModule },
      { path: 'users', module: RoutesAuthModule },
      { path: 'video-call', module: RoutesVideoCallModule },
    ]),
    RoutesRoomModule,
    RoutesAuthModule,
    RoutesVideoCallModule,
  ],
})
export class RouterModule {}
