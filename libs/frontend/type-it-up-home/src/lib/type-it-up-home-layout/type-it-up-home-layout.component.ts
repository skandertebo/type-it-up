import { AuthService } from '@/frontend/type-it-up-auth';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-type-it-up-home-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <ng-container *ngIf="auth.loading$ | async; else content">
      <p>Loading...</p>
    </ng-container>
    <ng-template #content>
      <ng-container *ngIf="user$ | async as user; else login">
        <p>Welcome, {{ user.name }}</p>
        <router-outlet></router-outlet>
      </ng-container>
      <ng-template #login>
        <p>You are not logged in. Redirecting...</p>
      </ng-template>
    </ng-template>
  `,
})
export class TypeItUpHomeLayoutComponent {
  user$: typeof AuthService.prototype.user$;
  constructor(public auth: AuthService) {
    this.user$ = auth.user$;
  }
}
