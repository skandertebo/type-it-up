import { Component } from '@angular/core';
import { LeaderboardPodiumItemComponent } from '../leaderboard-podium-item/leaderboard-podium-item.component';

@Component({
  selector: 'lib-podium',
  standalone: true,
  imports: [LeaderboardPodiumItemComponent],
  templateUrl: './podium.component.html',
  styleUrl: './podium.component.css',
})
export class PodiumComponent {
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
  ];
}
