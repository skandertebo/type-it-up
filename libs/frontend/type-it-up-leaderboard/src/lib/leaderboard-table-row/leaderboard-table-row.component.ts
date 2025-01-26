import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-leaderboard-table-row',
  standalone: true,
  imports: [],
  templateUrl: './leaderboard-table-row.component.html',
  styleUrl: './leaderboard-table-row.component.css',
})
export class LeaderboardTableRowComponent {
  @Input() rowData!: {
    rank: number;
    name: string;
    bestScore: number;
    avgScore: number;
    speed: number;
    accuracy: number;
  };
}
