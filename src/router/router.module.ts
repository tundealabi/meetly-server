import { Module } from '@nestjs/common';
import { RouterModule as NestRouterModule } from '@nestjs/core';
import { RoutesAuthModule, RoutesVideoCallModule } from './routes';

@Module({
  imports: [
    NestRouterModule.register([
      { path: 'users', module: RoutesAuthModule },
      { path: 'video-call', module: RoutesVideoCallModule },
    ]),
    RoutesAuthModule,
    RoutesVideoCallModule,
  ],
})
export class RouterModule {}
