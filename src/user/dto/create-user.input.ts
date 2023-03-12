import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateUserInputType')
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
