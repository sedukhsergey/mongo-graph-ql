import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserPersistenceModule } from '../user/user-persistence/user-persistence.module';
import { LocalStrategy } from './local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthenticationResolver } from './authentication.resolver';
import { StudentPersistenceModule } from "../student/student-persistence/student-persistence.module";

@Module({
  imports: [
    UserPersistenceModule,
    StudentPersistenceModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    AuthenticationResolver,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
