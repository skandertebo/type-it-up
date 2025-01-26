import { Args, Query, Resolver } from '@nestjs/graphql';
import { GameGenerationService } from './game-generation.service';
import { Difficulty, GeneratedTextResponse } from './types/generated-text.type';

@Resolver()
export class GameGenerationResolver {
  constructor(private readonly gameGenerationService: GameGenerationService) {}

  @Query(() => GeneratedTextResponse)
  async generateText(
    @Args('difficulty', { type: () => Difficulty, defaultValue: Difficulty.MEDIUM }) difficulty: Difficulty,
  ) {
    return this.gameGenerationService.generateText(difficulty);
  }
} 