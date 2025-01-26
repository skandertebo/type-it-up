import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_GAME_HISTORY, SortOrder } from '@/frontend/type-it-up-graphql';

type Filter = {
  sortBy: string;
  sortOrder: SortOrder;
  since: Date | undefined;
  until: Date | undefined;
};

type Game = {
  __typename?: 'Game';
  id: string;
  gameContent: string;
  userContent: string;
  duration: number;
  wpm: number;
  accuracy: number;
  score: number;
  createdAt: Date;
  options: {
    __typename?: 'GameOptions';
    difficulty: string;
    punctuation: boolean;
    numbers: boolean;
  };
  users: Array<{
    __typename?: 'User';
    id: string;
    username: string;
    firstName?: string | null;
    lastName?: string | null;
    workosId: string;
  }>;
};

@Component({
  selector: 'lib-type-it-up-history',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './type-it-up-history.component.html',
  styleUrl: './type-it-up-history.component.css',
})
export class TypeItUpHistoryComponent implements OnInit {
  gameHistory: Game[] = [];

  filters: Filter = {
    sortBy: 'score',
    sortOrder: SortOrder.Desc,
    since: undefined,
    until: undefined,
  };

  appliedFilters = { ...this.filters };

  currentPage = 1;
  itemsPerPage = 10;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.appliedFilters.sortBy = params['sortBy'] || 'score';
      this.appliedFilters.sortOrder = params['order'] || SortOrder.Desc;
      this.appliedFilters.since = params['since'] || undefined;
      this.appliedFilters.until = params['until'] || undefined;
      this.currentPage = params['page'] ? +params['page'] : 1;
    });

    this.applyFilters();
  }

  getGameData(appliedFilters: Filter) {
    this.apollo.query({
      query: GET_GAME_HISTORY,
      variables: {
        since: appliedFilters.since,
        until: appliedFilters.until,
        sortOrder: appliedFilters.sortOrder,
      },
    }).subscribe(({ data }) => {
      this.gameHistory = data.getGameHistory;
    });
    
  }

  get totalPages(): number {
    return Math.ceil(this.gameHistory.length / this.itemsPerPage);
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.gameHistory.slice(startIndex, startIndex + this.itemsPerPage);
  }

  applyFilters() {
    const sinceDate = this.filters.since ? new Date(this.filters.since) : undefined;
    const untilDate = this.filters.until ? new Date(this.filters.until) : undefined;
    const order = this.filters.sortOrder==="ASC" ? SortOrder.Asc : SortOrder.Desc;
    this.appliedFilters = {
      ...this.filters,
      sortOrder: order,
      since: sinceDate,
      until: untilDate,
    };
    this.currentPage = 1; 
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sortBy: this.appliedFilters.sortBy,
        order: this.appliedFilters.sortOrder,
        since: this.appliedFilters.since,
        until: this.appliedFilters.until,
        page: this.currentPage,
      },
      queryParamsHandling: 'merge',
    });
    this.getGameData(this.appliedFilters);
  }

  clearFilters() {
    this.filters = {
      sortBy: 'score',
      sortOrder: SortOrder.Desc,
      since: undefined,
      until: undefined,
    };
    this.applyFilters();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage },
        queryParamsHandling: 'merge',
      });
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage },
        queryParamsHandling: 'merge',
      });
    }
  }
}
