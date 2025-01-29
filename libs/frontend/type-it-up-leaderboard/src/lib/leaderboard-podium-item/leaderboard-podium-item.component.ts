import { LeaderboardEntry } from '@/frontend/type-it-up-graphql';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-leaderboard-podium-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard-podium-item.component.html',
  styleUrl: './leaderboard-podium-item.component.css',
})
export class LeaderboardPodiumItemComponent {
  @Input() rank!: number;
  @Input() entry!: LeaderboardEntry;

  get icon(): string {
    switch (this.rank) {
      case 1:
        return '/shared-assets/images/first.png';
      case 2:
        return '/shared-assets/images/second.png';
      default:
        return '/shared-assets/images/third.png';
    }
  }

  get height(): string {
    switch (this.rank) {
      case 1:
        return '128px';
      case 2:
        return '96px';
      default:
        return '64px';
    }
  }
}
