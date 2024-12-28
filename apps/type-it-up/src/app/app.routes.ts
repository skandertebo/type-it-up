import { Route } from '@angular/router';
import { LoginComponent } from '@type-it-up/login';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  // {
  //   path: 'callback',
  //   component: CallbackComponent,
  //   loadComponent: () => CallbackComponent,
  // },
];
