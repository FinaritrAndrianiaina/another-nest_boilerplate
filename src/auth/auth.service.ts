import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import User from 'src/users/entities/user.entity';
import { UserPayload } from './dto/user.payload';

@Injectable()
export class AuthService {
  constructor(
    private usersSerice: UsersService,
    private jwtSerice: JwtService,
  ) {}

  async createToken(user: User): Promise<{ access_token }> {
    const payload: UserPayload = { userId: user.id, username: user.username };
    return {
      access_token: this.jwtSerice.sign(payload),
    };
  }
}
