import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => User)
  findOneUserById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.updateUser(updateUserInput);
  }
}
