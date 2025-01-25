import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { Game } from './entities/game.entity';
import { UserStats } from './entities/user-stats.entity';
import { User } from './entities/user.entity';
import { GqlAuthGuard } from './guards/auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from './user.service';
import { WorkosService } from './workos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserStats, Game]), 
    PassportModule
  ],
  exports: [PassportModule, UserService, GqlAuthGuard],
  providers: [AuthResolver, WorkosService, UserService, JwtStrategy, GqlAuthGuard],
})
export class AuthModule {}
