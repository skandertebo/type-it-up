import { Component } from '@angular/core';
import { LeaderboardTableRowComponent } from '../leaderboard-table-row/leaderboard-table-row.component';

@Component({
  selector: 'lib-leaderboard-table',
  standalone: true,
  imports: [LeaderboardTableRowComponent],
  templateUrl: './leaderboard-table.component.html',
})
export class LeaderboardTableComponent {
  players = [
    {
      rank: 1,
      name: 'troupi',
      bestScore: 150,
      avgScore: 135,
      speed: 50,
      accuracy: 90,
    },
    {
      rank: 2,
      name: 'troupi',
      bestScore: 150,
      avgScore: 135,
      speed: 50,
      accuracy: 90,
    },
    {
      rank: 3,
      name: 'troupi',
      bestScore: 150,
      avgScore: 135,
      speed: 50,
      accuracy: 90,
    },
    {
      rank: 4,
      name: 'troupi',
      bestScore: 150,
      avgScore: 135,
      speed: 50,
      accuracy: 90,
    },
  ];
}
