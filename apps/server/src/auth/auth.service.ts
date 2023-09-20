import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UserService } from '../user/user.service';

// TODO: Wykorzystać Passport do implementacji logowania i rejestracji użytkowników
// TODO: Przygotować Guards dla endpointów
// TODO: Operacje na profilu / koncie, może wykonywać wyłącznie zalogowany użytkownik, tj. użytkownik wykonuje zapytanie http, a jego metadane są w nagłówku zapytania z którego pobieramy id użytkownika
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string): Promise<{ token: string }> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await compare(pass, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, username: user.email };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(email: string, pass: string): Promise<{ token: string }> {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await hash(pass, 10);
    const user = await this.userService.create(email, hashedPassword);

    const payload = { sub: user._id, username: user.email };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
