import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { WorkosService } from './workos.service';

@Resolver()
export class AuthResolver {
  private secret: string;

  constructor(
    private readonly workosService: WorkosService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
    if (!process.env['JWT_SECRET']) {
      throw new Error('JWT_SECRET is not set');
    }
    this.secret = process.env['JWT_SECRET'];
  }

  @Mutation(() => String)
  async authenticate(@Args('code') code: string): Promise<string> {
    const profile = await this.workosService.authenticate(code);

    let user = await this.userRepository.findOne({
      where: { email: profile.email },
    });

    if (!user) {
      user = this.userRepository.create({
        email: profile.email,
        name: profile.firstName + ' ' + profile.lastName,
        profilePicture: profile.rawAttributes?.['picture'],
      });
      await this.userRepository.save(user);
    }

    // Generate a JWT
    const token = jwt.sign({ userId: user.id }, this.secret, {
      expiresIn: '1h',
    });

    return token;
  }
}
