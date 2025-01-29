import { Component, inject, OnInit } from '@angular/core';
import { LeaderboardPodiumItemComponent } from '../leaderboard-podium-item/leaderboard-podium-item.component';
import { CommonModule } from '@angular/common';
import { LeaderboardService } from '../leaderboard.service';
import {
  LeaderboardEntry,
  LeaderboardSortType,
  SortOrder,
} from '@/frontend/type-it-up-graphql';

@Component({
  selector: 'lib-podium',
  standalone: true,
  imports: [LeaderboardPodiumItemComponent, CommonModule],
  templateUrl: './podium.component.html',
  styleUrl: './podium.component.css',
})
export class PodiumComponent implements OnInit {
  private leaderboardService = inject(LeaderboardService);
  entries: LeaderboardEntry[] = [];

  ngOnInit() {
    this.fetchData();
  }

  fetchData(): void {
    this.leaderboardService
      .getLeaderboard({
        sortBy: LeaderboardSortType.BestScore,
        sortOrder: SortOrder.Desc,
        limit: 3,
        offset: 1,
      })
      .subscribe({
        next: ({ entries }) => {
          this.entries = entries;
        },
      });
  }
}
