import { Game, UserStats } from '@/backend/auth';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameResolver } from './game.resolver';
import { GameService } from './game.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game, UserStats]),
  ],
  providers: [GameService, GameResolver],
  exports: [GameService],
})
export class GameModule {}
