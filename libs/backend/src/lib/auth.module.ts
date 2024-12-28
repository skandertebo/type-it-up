import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { User } from './entities/user.entity';
import { WorkosService } from './workos.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthResolver, WorkosService],
})
export class AuthModule {}
