import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './entities/user.entity';

@ObjectType()
export class RefreshAuthenticationResponse {
  @Field(() => String, {
    description: 'A JWT containing information about the session.',
  })
  accessToken!: string;

  @Field(() => String, {
    description: 'Exchange this token for new access tokens.',
  })
  refreshToken!: string;
}

@ObjectType()
export class AuthenticationResponse extends RefreshAuthenticationResponse {
  @Field(() => User, { description: 'The authenticated user.' })
  user!: User;
}

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
