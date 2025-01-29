import { LeaderboardService } from './../leaderboard.service';
import { Component, inject, OnInit } from '@angular/core';
import { Filter } from '../../types';
import {
  LeaderboardEntry,
  LeaderboardSortType,
  SortOrder,
} from '@/frontend/type-it-up-graphql';
import { itemsPerPage } from '../../constants';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-leaderboard-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard-table.component.html',
  styleUrl: './leaderboard-table.component.css',
})
export class LeaderboardTableComponent implements OnInit {
  private leaderboardService = inject(LeaderboardService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public LeaderboardSortType = LeaderboardSortType;
  entries: LeaderboardEntry[] = [];
  hasNextPage = true;

  filters: Filter = {
    sortBy: LeaderboardSortType.BestScore,
    sortOrder: SortOrder.Desc,
    limit: itemsPerPage,
    offset: 1,
  };

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.filters.sortBy = params['sortBy'] || LeaderboardSortType.BestScore;
      this.filters.sortOrder = params['order'] || SortOrder.Desc;
      this.filters.offset = params['page'] ? +params['page'] : 1;
    });
    this.fetchData();
  }

  // posibility of debounce
  fetchData(): void {
    this.leaderboardService.getLeaderboard(this.filters).subscribe({
      next: ({ entries, hasNextPage }) => {
        this.entries = entries;
        this.hasNextPage = hasNextPage;
      },
    });
  }

  updateQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sortBy: this.filters.sortBy,
        order: this.filters.sortOrder,
        page: this.filters.offset,
      },
      queryParamsHandling: 'merge',
    });
  }

  onSortClick(sortBy: LeaderboardSortType): void {
    this.filters.sortBy = sortBy;
    this.filters.sortOrder =
      this.filters.sortOrder === SortOrder.Desc
        ? SortOrder.Asc
        : SortOrder.Desc;
    this.filters.offset = 1;
    this.updateQueryParams();
    this.fetchData();
  }

  nextPage() {
    if (this.hasNextPage) {
      this.filters.offset++;
      this.updateQueryParams();
      this.fetchData();
    }
  }

  previousPage() {
    if (this.filters.offset > 1) {
      this.filters.offset--;
      this.updateQueryParams();
      this.fetchData();
    }
  }

  getArrowIcon(sortType: LeaderboardSortType): string {
    if (this.filters.sortBy !== sortType)
      return '/shared-assets/images/doubleArrow.svg';
    return this.filters.sortOrder === SortOrder.Asc
      ? '/shared-assets/images/arrowUp.svg'
      : '/shared-assets/images/arrow.svg';
  }

  getRank(index: number): number {
    return (this.filters.offset - 1) * itemsPerPage + index + 1;
  }
}
