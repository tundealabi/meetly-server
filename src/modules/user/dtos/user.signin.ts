import { IsString, MinLength } from 'class-validator';

export class GoogleSignInDto {
  @IsString()
  @MinLength(700, {
    message: 'Token might be invalid',
  })
  idToken!: string;
}
