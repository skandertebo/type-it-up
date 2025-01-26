import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeItUpUserComponent } from "../type-it-up-user/type-it-up-user.component";
import { LineChartComponent } from "../linechart/linechart.component";
import { AuthService } from '@/frontend/type-it-up-auth';
import { Apollo } from 'apollo-angular';
import { GET_USER_STATS } from '@/frontend/type-it-up-graphql';
import { get } from 'http';

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

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      console.log(user);
    });
    this.getUserStats();
  }

  getUserStats() {
    this.apollo
      .query({
        query: GET_USER_STATS,
      })
      .subscribe((result) => {
        console.log(result);
      });
  }
}
