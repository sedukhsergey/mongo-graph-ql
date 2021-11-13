import { Resolver } from '@nestjs/graphql';
import { UserType } from './types/user.type';

@Resolver((of) => UserType)
export class UserResolver {
}
