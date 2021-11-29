import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ProfileService } from './profile.service';
import { ProfileType } from './profile.type';
import { CreateProfileInput } from "./create-profile.input";

@Resolver(() => ProfileType)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => ProfileType, {name: "createProfile"})
  async createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput
  ) {
    return this.profileService.create(createProfileInput)
  }
}
