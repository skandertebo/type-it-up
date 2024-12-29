import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './entities/user.entity';

@ObjectType()
export class AuthResult {
  @Field(() => User, {
    description: 'The authenticated user.',
  })
  user!: User;

  @Field(() => String, { description: 'The authenticated user.' })
  accessToken!: string;

  @Field(() => String, { description: 'The authenticated user.' })
  refreshToken!: string;
}
