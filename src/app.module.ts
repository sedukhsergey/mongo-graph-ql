import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './authentication/guards/jwt-auth.guard';
import { CategoryModule } from './category/category.module';
import { SeriesModule } from './series/series.module';
import { LessonModule } from './lesson/lesson.module';
import { GraphQLModule } from '@nestjs/graphql';
import { StudentModule } from './student/student.module';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { PubSubModule } from './pub-sub/pub-sub.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        playground: Boolean(configService.get('GRAPHQL_PLAYGROUND')),
        autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
        installSubscriptionHandlers: true,
        buildSchemaOptions: {
          dateScalarMode: 'isoDate',
        },
      }),
    }),
    ConfigModule,
    DatabaseModule,
    PostModule,
    UserModule,
    AuthenticationModule,
    CategoryModule,
    SeriesModule,
    LessonModule,
    StudentModule,
    PubSubModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
