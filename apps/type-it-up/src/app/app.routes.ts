import { CallbackComponent, LoginComponent } from '@/frontend/type-it-up-auth';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'auth/callback',
    component: CallbackComponent,
  },
];
