import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport'; 
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserPayload } from '../dto/user.payload';
import User from 'src/users/entities/user.entity';
import { ConfigService } from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userSerice: UsersService,
    private readonly config: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("JWT_SECRET_KEY"),
    });
  }

  async validate(payload: UserPayload): Promise<User> {
    try {
      return await this.userSerice.findOne(payload.userId);
    } catch (error) {
      throw new UnauthorizedException()
    }
  }
}
