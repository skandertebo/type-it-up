import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardTableComponent } from '../leaderboard-table/leaderboard-table.component';
import { PodiumComponent } from '../podium/podium.component';

@Component({
  selector: 'lib-type-it-up-leaderboard',
  standalone: true,
  imports: [CommonModule, LeaderboardTableComponent, PodiumComponent],
  templateUrl: './type-it-up-leaderboard.component.html',
})
export class TypeItUpLeaderboardComponent {}
