import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {
  Game,
  GameSortField,
  GET_GAME_HISTORY,
  SortOrder,
} from '@/frontend/type-it-up-graphql';

type Filter = {
  sortBy: GameSortField;
  sortOrder: SortOrder;
  since: Date | undefined;
  until: Date | undefined;
  skip: number;
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
    sortBy: GameSortField.Date,
    sortOrder: SortOrder.Desc,
    since: undefined,
    until: undefined,
    skip: 0,
  };
  appliedFilters = { ...this.filters };
  currentPage = 1;
  itemsPerPage = 7;
  hasNextPage = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.appliedFilters.sortBy = params['sortBy'] || GameSortField.Date;
      this.appliedFilters.sortOrder = params['order'] || SortOrder.Desc;
      this.appliedFilters.since = params['since'] || undefined;
      this.appliedFilters.until = params['until'] || undefined;
      this.currentPage = params['page'] ? +params['page'] : 1;
    });
    this.applyFilters();
  }

  getGameData(appliedFilters: Filter) {
    this.apollo
      .query({
        query: GET_GAME_HISTORY,
        variables: {
          since: appliedFilters.since,
          until: appliedFilters.until,
          sortOrder: appliedFilters.sortOrder,
          skip: appliedFilters.skip,
          sortBy: appliedFilters.sortBy,
          take: this.itemsPerPage,
        },
      })
      .subscribe(({ data }) => {
        this.gameHistory = data.getGameHistory as Game[];
        this.hasNextPage = this.gameHistory.length === this.itemsPerPage;
      });
  }

  applyFilters() {
    const skip = (this.currentPage - 1) * this.itemsPerPage;
    this.appliedFilters = { ...this.filters, skip };
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
      sortBy: GameSortField.Date,
      sortOrder: SortOrder.Desc,
      since: undefined,
      until: undefined,
      skip: 0,
    };
    this.currentPage = 1;
    this.applyFilters();
  }

  nextPage() {
    if (this.hasNextPage) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }
}
