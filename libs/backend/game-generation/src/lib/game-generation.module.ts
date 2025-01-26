import { Module } from '@nestjs/common';
import { GameGenerationResolver } from './game-generation.resolver';
import { GameGenerationService } from './game-generation.service';

@Module({
  providers: [GameGenerationService, GameGenerationResolver],
  exports: [GameGenerationService],
})
export class GameGenerationModule {}
