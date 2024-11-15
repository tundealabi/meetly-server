import { Module } from '@nestjs/common';
import { RouterModule as NestRouterModule } from '@nestjs/core';
import { RoutesVideoCallModule } from './routes';

@Module({
  imports: [
    NestRouterModule.register([
      { path: 'video-call', module: RoutesVideoCallModule },
    ]),
    RoutesVideoCallModule,
  ],
})
export class RouterModule {}
