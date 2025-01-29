import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { catchError, map, Observable, of } from 'rxjs';
import {
  GET_LEADERBOARD,
  LeaderboardEntry,
} from '@/frontend/type-it-up-graphql';
import { Filter } from '../types';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  apolloClient = inject(Apollo);
  toaster = inject(ToastrService);

  getLeaderboard(
    filters: Filter
  ): Observable<{ entries: LeaderboardEntry[]; hasNextPage: boolean }> {
    const offset = (filters.offset - 1) * filters.limit;

    return this.apolloClient
      .query<{ getLeaderboard: LeaderboardEntry[] }>({
        query: GET_LEADERBOARD,
        variables: {
          sortType: filters.sortBy,
          sortOrder: filters.sortOrder,
          limit: filters.limit,
          offset,
        },
      })
      .pipe(
        map((result) => ({
          entries: result.data.getLeaderboard,
          hasNextPage: result.data.getLeaderboard.length === filters.limit,
        })),
        catchError(() => {
          this.toaster.error('Error fetching leaderboard');
          return of({ entries: [], hasNextPage: false });
        })
      );
  }
}
