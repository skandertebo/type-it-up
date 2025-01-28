import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  GET_LEADERBOARD,
  LeaderboardEntry,
} from '@/frontend/type-it-up-graphql';
import { Filter } from '../types';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  apolloClient = inject(Apollo);

  // getLeaderboard(appliedFilters: Filter): Observable<LeaderboardEntry[]> {
  //   return this.apolloClient
  //     .query<{ leaderboard: { entries: LeaderboardEntry[] } }>({
  //       query: GET_LEADERBOARD,
  //       variables: {
  //         sortType: appliedFilters.sortBy,
  //         sortOrder: appliedFilters.sortOrder,
  //         limit: appliedFilters.limit,
  //         offset: appliedFilters.offset,
  //       },
  //     })
  //     .pipe(map((result) => result.data.leaderboard.entries));
  // }
}
