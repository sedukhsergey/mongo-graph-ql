import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserPersistenceService } from '../user/user-persistence/user-persistence.service';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { User } from '../user/user-persistence/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { StudentPersistenceService } from '../student/student-persistence/student-persistence.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userPersistence: UserPersistenceService,
    private readonly studentPersistenceService: StudentPersistenceService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  public getCookieWithJwtToken(userId: string) {
    const payload: TokenPayloadDto = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  public async getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<User> {
    try {
      const user = await this.userPersistence.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<void> {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
