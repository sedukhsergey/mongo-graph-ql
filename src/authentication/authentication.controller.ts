import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors, ValidationPipe
} from "@nestjs/common";
import { AuthenticationService } from './authentication.service';
import RequestWithUser from '../interfaces/request-with-user.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';
import { Response } from 'express';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';
import { Public } from '../decorators/public.decorator';
import MongooseClassSerializerInterceptor from '../interceptors/mongooseClassSerializer.interceptor';
import { User } from '../user/user-persistence/schemas/user.schema';

@Controller('authentication')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('register')
  async register(@Body(new ValidationPipe()) registrationData: CreateUserDto): Promise<User> {
    return this.authenticationService.register(registrationData);
  }

  @Public()
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(
    @Req() request: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
  ): Promise<User> {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user._id);
    response.setHeader('Set-Cookie', cookie);
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(
    @Req() request: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return { success: 'ok' };
  }
}
