import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
    loadComponent: () => LoginComponent,
  },
  {
    path: 'callback',
    component: CallbackComponent,
    loadComponent: () => CallbackComponent,
  },
];
