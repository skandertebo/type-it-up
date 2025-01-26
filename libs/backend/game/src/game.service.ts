import { Game, User, UserStats } from '@/backend/auth';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { subDays } from 'date-fns';
import {
  Between,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';
import { GetGameHistoryArgs, SortOrder } from './dto/get-game-history.args';
import {
  GetLeaderboardArgs,
  LeaderboardSortType,
} from './dto/get-leaderboard.args';
import { UserGameStats } from './dto/user-stats.model';

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

  async createGame(
    user: User,
    createGameInput: CreateGameInput
  ): Promise<Game> {
    Logger.log(`Creating game for user: ${user.id}`);

    const game = this.gameRepository.create({
      ...createGameInput,
      users: [user],
    });

    Logger.log(`Creating game with input: ${JSON.stringify(createGameInput)}`);

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
        (userStats.averageAccuracy * (totalGames - 1) + game.accuracy) /
        totalGames;
    }

    await this.userStatsRepository.save(userStats);

    return savedGame;
  }

  async deleteGame(id: string, user: User): Promise<boolean> {
    const game = await this.getGame(id);

    if (!game.users.some((u) => u.id === user.id)) {
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
          (userStats.averageAccuracy * (totalGames + 1) - game.accuracy) /
          totalGames;
      } else {
        userStats.averageWpm = 0;
        userStats.averageAccuracy = 0;
      }

      await this.userStatsRepository.save(userStats);
    }

    await this.gameRepository.remove(game);
    return true;
  }

  async getGameHistory(user: User, args: GetGameHistoryArgs): Promise<Game[]> {
    const { since, until, difficulty, sortOrder = SortOrder.DESC } = args;

    // Build the where clause with proper typing
    const where: FindOptionsWhere<Game> = {
      users: { id: user.id },
    };

    // Add date filters if provided
    if (since || until) {
      if (since && until) {
        where.createdAt = Between(since, until);
      } else if (since) {
        where.createdAt = MoreThanOrEqual(since);
      } else if (until) {
        where.createdAt = LessThanOrEqual(until);
      }
    }

    // Add difficulty filter if provided
    if (difficulty) {
      where.options = {
        difficulty,
      };
    }

    return this.gameRepository.find({
      where,
      relations: ['users'],
      order: {
        score: sortOrder,
        createdAt: 'DESC', // Secondary sort by date
      },
    });
  }

  async getLeaderboard(args: GetLeaderboardArgs) {
    const { sortType } = args;

    if (sortType === LeaderboardSortType.BEST_SCORE) {
      // Get users with their best scores
      const result = await this.gameRepository
        .createQueryBuilder('game')
        .leftJoin('game.users', 'user')
        .select('user.id', 'userId')
        .addSelect('user.username', 'username')
        .addSelect('user.firstName', 'firstName')
        .addSelect('user.lastName', 'lastName')
        .addSelect('MAX(game.score)', 'score')
        .groupBy('user.id')
        .orderBy('MAX(game.score)', 'DESC')
        .getRawMany();

      return result.map((row) => ({
        user: {
          id: row.userId,
          username: row.username,
          firstName: row.firstName,
          lastName: row.lastName,
        },
        score: parseFloat(row.score),
      }));
    } else {
      // Get users with their average scores
      const result = await this.gameRepository
        .createQueryBuilder('game')
        .leftJoin('game.users', 'user')
        .select('user.id', 'userId')
        .addSelect('user.username', 'username')
        .addSelect('user.firstName', 'firstName')
        .addSelect('user.lastName', 'lastName')
        .addSelect('AVG(game.score)', 'score')
        .groupBy('user.id')
        .orderBy('AVG(game.score)', 'DESC')
        .getRawMany();

      return result.map((row) => ({
        user: {
          id: row.userId,
          username: row.username,
          firstName: row.firstName,
          lastName: row.lastName,
        },
        score: parseFloat(row.score),
      }));
    }
  }

  async getUserStats(user: User): Promise<UserGameStats> {
    // Get overall stats using query builder
    const overallStats = await this.gameRepository
      .createQueryBuilder('game')
      .innerJoin('game.users', 'user')
      .where('user.id = :userId', { userId: user.id })
      .select([
        'AVG(game.wpm) as averageWpm',
        'AVG(game.accuracy) as averageAccuracy',
        'MAX(game.score) as highestScore',
      ])
      .getRawOne();

    // Get daily stats for past 7 days
    const today = new Date();
    const sevenDaysAgo = subDays(today, 7);

    const dailyStatsQuery = await this.gameRepository
      .createQueryBuilder('game')
      .innerJoin('game.users', 'user')
      .where('user.id = :userId', { userId: user.id })
      .andWhere('game.createdAt >= :sevenDaysAgo', { sevenDaysAgo })
      .select([
        'DATE(game.createdAt) as date',
        'AVG(game.wpm) as averageWpm',
        'AVG(game.accuracy) as averageAccuracy',
        'MAX(game.score) as highestScore',
      ])
      .groupBy('DATE(game.createdAt)')
      .orderBy('DATE(game.createdAt)', 'DESC')
      .getRawMany();

    const dailyStats = dailyStatsQuery.map((stat) => {
      const averageWpm = stat.averagewpm ?? 0;
      const averageAccuracy = stat.averagewccuracy ?? 0;
      return {
        date: new Date(stat.date),
        averageWpm: averageWpm,
        averageAccuracy: averageAccuracy,
      };
    });

    const averageWpm = overallStats.averagewpm ?? 0;
    const averageAccuracy = overallStats.averageaccuracy ?? 0;
    const highestScore = overallStats.highestscore ?? 0;

    const result = {
      averageWpm: averageWpm,
      averageAccuracy: averageAccuracy,
      highestScore: highestScore,
      dailyStats,
    };
    return result;
  }
}
