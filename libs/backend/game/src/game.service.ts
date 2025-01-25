import { Game, User, UserStats } from '@/backend/auth';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(UserStats)
    private readonly userStatsRepository: Repository<UserStats>
  ) {}

  async getUserGames(user: User): Promise<Game[]> {
    return this.gameRepository.find({
      where: { users: { id: user.id } },
      relations: ['users'],
    });
  }

  async getGame(id: string): Promise<Game> {
    const game = await this.gameRepository.findOne({
      where: { id },
      relations: ['users'],
    });
    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    return game;
  }

  async createGame(user: User, createGameInput: CreateGameInput): Promise<Game> {
    const game = this.gameRepository.create({
      ...createGameInput,
      users: [user],
    });
    
    const savedGame = await this.gameRepository.save(game);

    // Update user stats
    let userStats = await this.userStatsRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (!userStats) {
      userStats = this.userStatsRepository.create({
        user,
        averageWpm: game.wpm,
        averageAccuracy: game.accuracy,
      });
    } else {
      const userGames = await this.getUserGames(user);
      const totalGames = userGames.length + 1;
      
      userStats.averageWpm = 
        (userStats.averageWpm * (totalGames - 1) + game.wpm) / totalGames;
      userStats.averageAccuracy = 
        (userStats.averageAccuracy * (totalGames - 1) + game.accuracy) / totalGames;
    }

    await this.userStatsRepository.save(userStats);

    return savedGame;
  }

  async deleteGame(id: string, user: User): Promise<boolean> {
    const game = await this.getGame(id);
    
    if (!game.users.some(u => u.id === user.id)) {
      throw new NotFoundException('Game not found or user not authorized');
    }

    // Update user stats before deletion
    const userStats = await this.userStatsRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (userStats) {
      const userGames = await this.getUserGames(user);
      const totalGames = userGames.length - 1;

      if (totalGames > 0) {
        userStats.averageWpm = 
          (userStats.averageWpm * (totalGames + 1) - game.wpm) / totalGames;
        userStats.averageAccuracy = 
          (userStats.averageAccuracy * (totalGames + 1) - game.accuracy) / totalGames;
      } else {
        userStats.averageWpm = 0;
        userStats.averageAccuracy = 0;
      }

      await this.userStatsRepository.save(userStats);
    }

    await this.gameRepository.remove(game);
    return true;
  }
}
