import {
  CallbackComponent,
  ProtectedGuard,
  PublicGuard,
} from '@/frontend/type-it-up-auth';
import {
  TypeItUpHomeComponent,
  TypeItUpHomeLayoutComponent,
} from '@/frontend/type-it-up-home';
import { TypeItUpLandingComponent } from '@/frontend/type-it-up-landing';
import { TypeItUpLeaderboardComponent } from '@/frontend/type-it-up-leaderboard';
import { LoginComponent, SignUpComponent } from '@/frontend/type-it-up-landing';
import { Route } from '@angular/router';
import {} from '@nestjs/passport';
const Profile = import('@/frontend/type-it-up-profile');
const History = import('@/frontend/type-it-up-history');

export const appRoutes: Route[] = [
  {
    path: '',
    component: TypeItUpHomeLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: TypeItUpHomeComponent },
      {
        path: 'profile',
        component: TypeItUpProfileComponent,
        canActivate: [ProtectedGuard],
      },
      {
        path: 'leaderboard',
        component: TypeItUpLeaderboardComponent,
        loadComponent: () => Profile.then((m) => m.TypeItUpProfileComponent),
        data: { preload: true },
        canActivate: [ProtectedGuard],
      },
      {
        path: 'history',
        loadComponent: () => History.then((m) => m.TypeItUpHistoryComponent),
        data: { preload: true },
        canActivate: [ProtectedGuard],
      },
    ],
  },
  {
    path: 'auth/callback',
    component: CallbackComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [PublicGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [PublicGuard],
  },
  { path: '**', redirectTo: 'home' },
];
