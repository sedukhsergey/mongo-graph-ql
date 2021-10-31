import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [ConfigModule, DatabaseModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
