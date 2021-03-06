import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserPersistenceService } from '../user/user-persistence/user-persistence.service';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { User } from '../user/user-persistence/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userPersistenceService: UserPersistenceService,
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   (request: any) => {
      //   console.log('request',request)
      //     return request?.headers?.authorization;
      //   },
      // ]),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayloadDto): Promise<User> {
    return this.userPersistenceService.getById(payload.userId);
  }
}
