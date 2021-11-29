import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './profile.schema';
import {
  Visitor,
  VisitorSchema,
} from '../post/post-persistence/schemas/visitor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema },
      { name: Visitor.name, schema: VisitorSchema },
    ]),
  ],
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
