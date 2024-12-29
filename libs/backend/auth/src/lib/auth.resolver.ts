import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthResult } from './auth.models';
import { User } from './entities/user.entity';
import { CurrentUser } from './get-user.decorator';
import { GqlAuthGuard } from './guards/auth.guard';
import { WorkosService } from './workos.service';

@Resolver()
export class AuthResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly workosService: WorkosService
  ) {}

  @Mutation(() => AuthResult)
  async authenticateWithRefreshToken(
    @Args('refreshToken') oldRefreshToken: string
  ) {
    const {
      user: profile,
      accessToken,
      refreshToken,
    } = await this.workosService.authenticateWithRefreshToken(oldRefreshToken);

    const user = await this.userRepository.findOne({
      where: { workosId: profile.id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return { user, accessToken, refreshToken };
  }

  @Mutation(() => AuthResult)
  async authenticateWithCode(@Args('code') code: string) {
    const {
      user: profile,
      accessToken,
      refreshToken,
    } = await this.workosService.authenticateWithCode(code);

    let user = await this.userRepository.findOne({
      where: { workosId: profile.id },
    });

    if (!user) {
      user = this.userRepository.create({
        email: profile.email,
        name: profile.firstName + ' ' + profile.lastName,
        profilePicture: profile.profilePictureUrl ?? undefined,
        workosId: profile.id,
      });
      user = await this.userRepository.save(user);
    }

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async authenticateWithAccessToken(@CurrentUser() user: User) {
    return user;
  }
}
