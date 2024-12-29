import { Route } from '@angular/router';
import { CallbackComponent, LoginComponent } from '@type-it-up/login';

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
