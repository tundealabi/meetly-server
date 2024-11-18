import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserRepositoryModule } from './repository/user.repository.module';

@Module({
  imports: [UserRepositoryModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
