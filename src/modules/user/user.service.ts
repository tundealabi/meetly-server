import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { UserModel } from './repository/schemas';
import { CreateUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto) {
    const createUser: UserModel = new UserModel();

    createUser.email = dto.email;
    createUser.profilePicture = dto.profilePicture ?? '';
    createUser.socialAuthId = dto.socialAuthId;
    createUser.username = dto.username;

    return this.userRepository.create(createUser);
  }

  async findOneBySocialAuthId(authId: string) {
    return this.userRepository.findOne({ socialAuthId: authId });
  }
}
