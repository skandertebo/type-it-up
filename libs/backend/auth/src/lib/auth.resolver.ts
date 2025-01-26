import { generateRandomString } from '@/shared/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
        firstName: profile.firstName ?? '',
        lastName: profile.lastName ?? '',
        profilePicture: profile.profilePictureUrl ?? undefined,
        workosId: profile.id,
        username: generateRandomString(10),
      });
      user = await this.userRepository.save(user);
    }

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => AuthResult)
  async authenticateWithUserPassword(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    const authResult = await this.workosService.authenticateWithUserPassword(email, password);
    const user = await this.userRepository.findOne({ where: { workosId: authResult.user.id } });
    return {
      user: user,
      accessToken: authResult.accessToken,
      refreshToken: authResult.refreshToken,
    };
  }

  @Mutation(() => AuthResult)
  async registerUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('username') username: string
  ) {
    let existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Email already exists');
    }
    existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new Error('Username already exists');
    }
    const res = await this.workosService.registerUser(email, password, firstName, lastName);
    await this.workosService.verifyEmail(res.id);
    const addedUser = this.userRepository.create({
      firstName: res.firstName ?? firstName,
      lastName: res.lastName ?? lastName,
      username,
      email: res.email,
      workosId: res.id,
    });
    await this.userRepository.save(addedUser);
    const authResult = await this.workosService.authenticateWithUserPassword(email, password);
    return {
      user: addedUser,
      accessToken: authResult.accessToken,
      refreshToken: authResult.refreshToken,
    };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async authenticateWithAccessToken(@CurrentUser() user: User) {
    return user;
  }

  @Query(() => Boolean)
  async checkUsernameExists(@Args('username') username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    return !!user;
  }
}
