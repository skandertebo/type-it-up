import { AuthGuard, CallbackComponent } from '@/frontend/type-it-up-auth';
import {
  TypeItUpHomeComponent,
  TypeItUpHomeLayoutComponent,
} from '@/frontend/type-it-up-home';
import { TypeItUpLandingComponent } from '@/frontend/type-it-up-landing';
import { TypeItUpLeaderboardComponent } from '@/frontend/type-it-up-leaderboard';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    component: TypeItUpHomeLayoutComponent,
    children: [
      {
        path: 'home',
        component: TypeItUpHomeComponent,
      },
      {
        path: 'leaderboard',
        component: TypeItUpLeaderboardComponent,
      },
    ],
  },
  {
    path: 'auth/callback',
    component: CallbackComponent,
  },
];
