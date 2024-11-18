import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UserAuthJwtStrategy } from './strategies';

@Module({
  imports: [JwtModule],
  providers: [AuthService, UserAuthJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
