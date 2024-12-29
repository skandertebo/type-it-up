import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from './user.service';
import { WorkosService } from './workos.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly workosService: WorkosService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        jwksRequestsPerMinute: 5,
        jwksUri: workosService.jwksUrl,
        rateLimit: true,
      }),
    });
  }

  async validate(payload: JwtPayload) {
    const sub = payload.sub;
    if (!sub) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.getUser(sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
