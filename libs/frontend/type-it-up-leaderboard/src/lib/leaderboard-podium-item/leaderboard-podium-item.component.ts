import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-leaderboard-podium-item',
  standalone: true,
  imports: [],
  templateUrl: './leaderboard-podium-item.component.html',
  styleUrl: './leaderboard-podium-item.component.css',
})
export class LeaderboardPodiumItemComponent {
  @Input() player!: {
    rank: number;
    name: string;
    bestScore: number;
    avgScore: number;
    speed: number;
    accuracy: number;
  };

  get icon(): string {
    switch (this.player.rank) {
      case 1:
        return '/shared-assets/images/first.png';
      case 2:
        return '/shared-assets/images/second.png';
      default:
        return '/shared-assets/images/third.png';
    }
  }

  get height(): string {
    switch (this.player.rank) {
      case 1:
        return '128px';
      case 2:
        return '96px';
      default:
        return '64px';
    }
  }
}
