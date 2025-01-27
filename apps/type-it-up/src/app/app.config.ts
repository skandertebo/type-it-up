import { ORG_ID_TOKEN } from '@/frontend/shared';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { from, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { HttpLink } from '@apollo/client/link/http';
import { provideApollo } from 'apollo-angular';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(), provideToastr(),
    provideHttpClient(),
    provideApollo(() => {
      const authLink = setContext(() => {
        const accessToken = localStorage.getItem('accessToken');
        return {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        };
      });
      return {
        cache: new InMemoryCache(),
        link: from([
          authLink,
          new HttpLink({ uri: 'http://localhost:3000/graphql' }),
        ]),
      };
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withPreloading(PreloadAllModules)),
    { provide: ORG_ID_TOKEN, useValue: environment.ORG_ID },
  ],
};
