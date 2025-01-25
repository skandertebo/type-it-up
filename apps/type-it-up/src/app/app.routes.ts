import { AuthGuard, CallbackComponent } from '@/frontend/type-it-up-auth';
import {
  TypeItUpHomeComponent,
  TypeItUpHomeLayoutComponent,
} from '@/frontend/type-it-up-home';
import { LoginComponent, SignUpComponent, TypeItUpLandingComponent } from '@/frontend/type-it-up-landing';
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
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
    ]
    },
  {
    path: 'auth/callback',
    component: CallbackComponent,
  },
];
