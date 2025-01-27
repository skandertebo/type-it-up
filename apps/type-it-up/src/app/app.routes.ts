import { CallbackComponent, ProtectedGuard, PublicGuard } from '@/frontend/type-it-up-auth';
import { TypeItUpHistoryComponent } from '@/frontend/type-it-up-history';
import {
  TypeItUpHomeComponent,
  TypeItUpHomeLayoutComponent,
} from '@/frontend/type-it-up-home';
import { LoginComponent, SignUpComponent } from '@/frontend/type-it-up-landing';
import { TypeItUpProfileComponent } from '@/frontend/type-it-up-profile';
import { Route } from '@angular/router';
import {} from '@nestjs/passport';

export const appRoutes: Route[] = [
  {
    path: '',
    component: TypeItUpHomeLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: TypeItUpHomeComponent },
      {
        path: 'profile',
        loadComponent: () =>
          import('@/frontend/type-it-up-profile').then(
            (m) => m.TypeItUpProfileComponent
          ),
        data: { preload: true }, 
      },
      {
        path: 'history',
        loadComponent: () =>
          import('@/frontend/type-it-up-history').then(
            (m) => m.TypeItUpHistoryComponent
          ),
        data: { preload: true }, 
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
