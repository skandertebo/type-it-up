import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-type-it-up-history',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './type-it-up-history.component.html',
  styleUrl: './type-it-up-history.component.css',
})
export class TypeItUpHistoryComponent implements OnInit {
  gameHistory = [
    {
      score: 4,
      accuracy: '91%',
      wpm: '52',
      date: '31 SEP 2024',
    },
    {
      score: 5,
      accuracy: '91%',
      wpm: '52',
      date: '31 SEP 2024',
    },
    {
      score: 6,
      accuracy: '91%',
      wpm: '52',
      date: '31 MAY 2024',
    },
    {
      score: 7,
      accuracy: '91%',
      wpm: '52',
      date: '31 SEP 2021',
    },
    {
      score: 8,
      accuracy: '91%',
      wpm: '52',
      date: '31 SEP 2024',
    },
    {
      score: 9,
      accuracy: '91%',
      wpm: '52',
      date: '15 SEP 2024',
    },
    {
      score: 10,
      accuracy: '91%',
      wpm: '52',
      date: '31 SEP 2024',
    },
    {
      score: 4,
      accuracy: '91%',
      wpm: '52',
      date: '31 SEP 2024',
    },
    {
      score: 5,
      accuracy: '91%',
      wpm: '52',
      date: '31 SEP 2024',
    },
    {
      score: 6,
      accuracy: '91%',
      wpm: '52',
      date: '31 SEP 2024',
    },
    {
      score: 7,
      accuracy: '91%',
      wpm: '52',
      date: '31 SEP 2024',
    },
    {
      score: 8,
      accuracy: '91%',
      wpm: '52',
      date: '31 SEP 2024',
    },
    {
      score: 9,
      accuracy: '91%',
      wpm: '52',
      date: '31 SEP 2024',
    },
    {
      score: 10,
      accuracy: '91%',
      wpm: '52',
      date: '31 SEP 2024',
    },
  ];

   filters = {
    sortBy: 'score',
    order: 'asc',
    fromDate: '',
    untilDate: '',
  };

  appliedFilters = { ...this.filters };

  currentPage = 1;
  itemsPerPage = 10;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.appliedFilters.sortBy = params['sortBy'] || 'score';
      this.appliedFilters.order = params['order'] || 'asc';
      this.appliedFilters.fromDate = params['fromDate'] || '';
      this.appliedFilters.untilDate = params['untilDate'] || '';
      this.currentPage = params['page'] ? +params['page'] : 1;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get filteredData() {
    let data = [...this.gameHistory];

    if (this.appliedFilters.fromDate) {
      data = data.filter(
        (item) => new Date(item.date) >= new Date(this.appliedFilters.fromDate)
      );
    }
    if (this.appliedFilters.untilDate) {
      data = data.filter(
        (item) => new Date(item.date) <= new Date(this.appliedFilters.untilDate)
      );
    }

    if (this.appliedFilters.sortBy === 'score') {
      data.sort((a, b) =>
        this.appliedFilters.order === 'asc' ? a.score - b.score : b.score - a.score
      );
    } else if (this.appliedFilters.sortBy === 'date') {
      data.sort((a, b) =>
        this.appliedFilters.order === 'asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return data;
  }

  applyFilters() {
    this.appliedFilters = { ...this.filters }; // Apply the current filter settings
    this.currentPage = 1; // Reset to the first page
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sortBy: this.appliedFilters.sortBy,
        order: this.appliedFilters.order,
        fromDate: this.appliedFilters.fromDate,
        untilDate: this.appliedFilters.untilDate,
        page: this.currentPage,
      },
      queryParamsHandling: 'merge',
    });
  }

  clearFilters() {
    this.filters = {
      sortBy: 'score',
      order: 'asc',
      fromDate: '',
      untilDate: '',
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
