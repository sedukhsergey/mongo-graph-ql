import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './profile.schema';
import { CreateProfileInput } from "./create-profile.input";

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async create(profileData: CreateProfileInput) {
    const createdPost = await new this.profileModel({
      ...profileData,
    });
    const data = await createdPost.save();
    return data
  }
}
