import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { GET_LEADERBOARD } from '@/frontend/type-it-up-graphql';
import { Filter, PlayerStat } from '../types';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  apolloClient = inject(Apollo);

  getLeaderboard(appliedFilters: Filter): Observable<PlayerStat[]> {
    return this.apolloClient
      .query<{ leaderboard: { players: PlayerStat[] } }>({
        query: GET_LEADERBOARD,
        variables: {
          sortType: appliedFilters.sortBy,
        },
      })
      .pipe(map((result) => result.data.leaderboard.players));
  }
}
