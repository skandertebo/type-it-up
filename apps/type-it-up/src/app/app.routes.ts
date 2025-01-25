import { AuthGuard, CallbackComponent } from '@/frontend/type-it-up-auth';
import {
  TypeItUpHomeComponent,
  TypeItUpHomeLayoutComponent,
} from '@/frontend/type-it-up-home';
import { TypeItUpProfileComponent } from '@/frontend/type-it-up-profile';
import { TypeItUpLandingComponent } from '@/frontend/type-it-up-landing';
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
        component: TypeItUpProfileComponent,
      },
    ]
    },
  {
    path: 'auth/callback',
    component: CallbackComponent,
  },
];
