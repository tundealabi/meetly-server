import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from '../user.service';
import { AuthService } from '@/modules/auth/auth.service';
import { GoogleSignInDto } from '../dtos';
import { controllerResponse } from '@/common/helpers';
import { LoginResponse } from '../entities';

@Controller('auth')
export class UserAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // -------------------------------------------------------
  // USER GOOGLE SIGN IN
  // -------------------------------------------------------

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async googleSignIn(@Body() { idToken }: GoogleSignInDto) {
    const googleUser = await this.authService.getGoogleUser(idToken);

    if (!googleUser) {
      throw new UnauthorizedException('Token missing or expired');
    }
    if (!googleUser.email) {
      throw new UnauthorizedException('Email missing');
    }
    if (!googleUser.email_verified) {
      throw new UnauthorizedException('Email is not verified');
    }
    const userRecord = await this.userService.findOneBySocialAuthId(
      googleUser.sub,
    );

    const user =
      userRecord ||
      (await this.userService.create({
        email: googleUser.email,
        profilePicture: googleUser.picture,
        socialAuthId: googleUser.sub,
        username: googleUser.name || googleUser.email,
      }));

    const accessToken = await this.authService.createAccessToken({
      sub: user.id,
    });
    return controllerResponse<LoginResponse>({
      data: {
        tokens: { accessToken },
        user: {
          email: user.email,
          profilePicture: user.profilePicture,
          username: user.username,
        },
      },
    });
  }
}
