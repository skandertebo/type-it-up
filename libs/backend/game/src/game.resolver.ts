import { CurrentUser, Game, GqlAuthGuard, User } from '@/backend/auth';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateGameInput } from './dto/create-game.input';
import { GetGameHistoryArgs } from './dto/get-game-history.args';
import { GetLeaderboardArgs } from './dto/get-leaderboard.args';
import { LeaderboardEntry } from './dto/leaderboard-entry.model';
import { GameService } from './game.service';

@Resolver(() => Game)
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Game])
  async getUserGames(@CurrentUser() user: User) {
    return this.gameService.getUserGames(user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Game)
  async getGame(@Args('id') id: string) {
    return this.gameService.getGame(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Game)
  async createGame(
    @CurrentUser() user: User,
    @Args('createGameInput') createGameInput: CreateGameInput
  ) {
    return this.gameService.createGame(user, createGameInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteGame(@Args('id') id: string, @CurrentUser() user: User) {
    return this.gameService.deleteGame(id, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Game])
  async getGameHistory(
    @CurrentUser() user: User,
    @Args() args: GetGameHistoryArgs
  ) {
    return this.gameService.getGameHistory(user, args);
  }

  @Query(() => [LeaderboardEntry])
  async getLeaderboard(@Args() args: GetLeaderboardArgs) {
    return this.gameService.getLeaderboard(args);
  }
} 