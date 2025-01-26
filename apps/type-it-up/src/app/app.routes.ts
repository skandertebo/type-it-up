import { CallbackComponent } from '@/frontend/type-it-up-auth';
import {
  TypeItUpHomeComponent,
  TypeItUpHomeLayoutComponent,
} from '@/frontend/type-it-up-home';
import { Route } from '@angular/router';
import {} from '@nestjs/passport';

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
];
