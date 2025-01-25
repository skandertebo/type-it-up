import { Test, TestingModule } from '@nestjs/testing';
import { GameGenerationService } from './game-generation.service';

describe('GameGenerationService', () => {
  let service: GameGenerationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameGenerationService],
    }).compile();

    service = module.get<GameGenerationService>(GameGenerationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
