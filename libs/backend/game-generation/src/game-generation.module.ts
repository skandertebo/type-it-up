import { Module } from '@nestjs/common';
import { GameGenerationService } from './game-generation.service';

@Module({
  providers: [GameGenerationService],
  exports: [GameGenerationService],
})
export class GameGenerationModule {}
