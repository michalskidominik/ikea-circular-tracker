import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

// TODO: security from https://docs.nestjs.com/security/authentication
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signUpDto: { email: string; pass: string }) {
    return this.authService.signUp(signUpDto.email, signUpDto.pass);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: { email: string; pass: string }) {
    return this.authService.signIn(signInDto.email, signInDto.pass);
  }
}
