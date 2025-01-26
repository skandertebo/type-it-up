import { Component } from '@angular/core';
import { Filter } from '../../types';
import { LeaderboardSortType, SortOrder } from '@/frontend/type-it-up-graphql';
import { itemsPerPage } from '../../constants';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaderboardService } from '../leaderboard.service';

@Component({
  selector: 'lib-leaderboard-table',
  standalone: true,
  imports: [],
  templateUrl: './leaderboard-table.component.html',
  styleUrl: './leaderboard-table.component.css',
})
export class LeaderboardTableComponent {
  players = [
    {
      rank: 1,
      name: 'troupi',
      bestScore: 150,
      avgScore: 135,
      wpm: 50,
      accuracy: 90,
    },
    {
      rank: 2,
      name: 'troupi',
      bestScore: 150,
      avgScore: 135,
      wpm: 50,
      accuracy: 90,
    },
    {
      rank: 3,
      name: 'troupi',
      bestScore: 150,
      avgScore: 135,
      wpm: 50,
      accuracy: 90,
    },
    {
      rank: 4,
      name: 'troupi',
      bestScore: 150,
      avgScore: 135,
      wpm: 50,
      accuracy: 90,
    },
    {
      rank: 4,
      name: 'troupi',
      bestScore: 150,
      avgScore: 135,
      wpm: 50,
      accuracy: 90,
    },
    {
      rank: 4,
      name: 'troupi',
      bestScore: 150,
      avgScore: 135,
      wpm: 50,
      accuracy: 90,
    },
    {
      rank: 4,
      name: 'troupi',
      bestScore: 150,
      avgScore: 135,
      wpm: 50,
      accuracy: 90,
    },
    {
      rank: 4,
      name: 'troupi',
      bestScore: 150,
      avgScore: 135,
      wpm: 50,
      accuracy: 90,
    },
    {
      rank: 4,
      name: 'troupi',
      bestScore: 150,
      avgScore: 135,
      wpm: 50,
      accuracy: 90,
    },
    {
      rank: 4,
      name: 'troupi',
      bestScore: 150,
      avgScore: 135,
      wpm: 50,
      accuracy: 90,
    },
  ];

  totalPages = 10;

  filters: Filter = {
    sortBy: LeaderboardSortType.BestScore,
    sortOrder: SortOrder.Desc,
    page: 1,
  };

  bestScoreSortOrder: SortOrder | null = SortOrder.Desc;
  avgScoreSortOrder: SortOrder | null = null;

  itemsPerPage = itemsPerPage;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private leaderboardService: LeaderboardService
  ) {}

  get bestScoreArrow(): string {
    switch (this.bestScoreSortOrder) {
      case SortOrder.Desc:
        return '/shared-assets/images/arrowUp.svg';
      case SortOrder.Asc:
        return '/shared-assets/images/arrow.svg';
      default:
        return '/shared-assets/images/doubleArrow.svg';
    }
  }
  get avgScoreArrow(): string {
    switch (this.avgScoreSortOrder) {
      case SortOrder.Desc:
        return '/shared-assets/images/arrow.svg';
      case SortOrder.Asc:
        return '/shared-assets/images/arrowUp.svg';
      default:
        return '/shared-assets/images/doubleArrow.svg';
    }
  }

  onBestScoreClick() {
    this.bestScoreSortOrder =
      this.bestScoreSortOrder === SortOrder.Desc
        ? SortOrder.Asc
        : SortOrder.Desc;
    this.filters.sortBy = LeaderboardSortType.BestScore;
    this.filters.sortOrder = this.bestScoreSortOrder;
    this.filters.page = 1;
    this.avgScoreSortOrder = null;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sortBy: this.filters.sortBy,
        sortOrder: this.filters.sortOrder,
        page: this.filters.page,
      },
      queryParamsHandling: 'merge',
    });
  }

  onAvgScoreClick() {
    this.avgScoreSortOrder =
      this.avgScoreSortOrder === SortOrder.Desc
        ? SortOrder.Asc
        : SortOrder.Desc;
    this.filters.sortBy = LeaderboardSortType.AverageScore;
    this.filters.sortOrder = this.avgScoreSortOrder;
    this.filters.page = 1;
    this.bestScoreSortOrder = null;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sortBy: this.filters.sortBy,
        sortOrder: this.filters.sortOrder,
        page: this.filters.page,
      },
      queryParamsHandling: 'merge',
    });
  }

  nextPage() {
    if (this.filters.page < this.totalPages) {
      this.filters.page++;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          sortBy: this.filters.sortBy,
          sortOrder: this.filters.sortOrder,
          page: this.filters.page,
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  previousPage() {
    if (this.filters.page > 1) {
      this.filters.page--;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          sortBy: this.filters.sortBy,
          sortOrder: this.filters.sortOrder,
          page: this.filters.page,
        },
        queryParamsHandling: 'merge',
      });
    }
  }
}
