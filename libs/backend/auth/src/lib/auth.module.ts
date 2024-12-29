import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { User } from './entities/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from './user.service';
import { WorkosService } from './workos.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  exports: [PassportModule, UserService],
  providers: [AuthResolver, WorkosService, UserService, JwtStrategy],
})
export class AuthModule {}
