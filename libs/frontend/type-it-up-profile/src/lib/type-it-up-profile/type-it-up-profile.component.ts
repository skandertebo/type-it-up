import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeItUpUserComponent } from '../type-it-up-user/type-it-up-user.component';
import { LineChartComponent } from '../linechart/linechart.component';
import { AuthService } from '@/frontend/type-it-up-auth';
import { Apollo } from 'apollo-angular';
import {
  DailyStats,
  GET_USER_STATS,
  UserGameStats,
} from '@/frontend/type-it-up-graphql';

@Component({
  selector: 'lib-type-it-up-profile',
  standalone: true,
  imports: [CommonModule, TypeItUpUserComponent, LineChartComponent],
  templateUrl: './type-it-up-profile.component.html',
  styleUrl: './type-it-up-profile.component.css',
})
export class TypeItUpProfileComponent implements OnInit {
  authService = inject(AuthService);
  apollo = inject(Apollo);
  userStats: UserGameStats | undefined;
  dailyStats: DailyStats[] = [];
  user = {
    username: '',
    averageWpm: 0,
    averageAccuracy: 0,
    highestScore: 0,
  };

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user.username = user.username;
      }
    });
    this.getUserStats();
  }

  getUserStats() {
    this.apollo
      .query({
        query: GET_USER_STATS,
      })
      .subscribe((result) => {
        this.user = {
          ...this.user,
          averageWpm:
            Math.round(result.data.getUserStats.averageWpm * 100) / 100,
          averageAccuracy:
            Math.round(result.data.getUserStats.averageAccuracy * 100) / 100,
          highestScore:
            Math.round(result.data.getUserStats.highestScore * 100) / 100,
        };
        this.dailyStats = result.data.getUserStats.dailyStats.map(
          (stat: DailyStats) => ({
            ...stat,
            wpm: Math.round(stat.averageWpm * 100) / 100,
            accuracy: Math.round(stat.averageAccuracy * 100) / 100,
          })
        );
      });
  }
}
