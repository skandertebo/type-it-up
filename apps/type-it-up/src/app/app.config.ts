import { ORG_ID_TOKEN } from '@/frontend/shared';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { from, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { HttpLink } from '@apollo/client/link/http';
import { provideApollo } from 'apollo-angular';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
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
    provideRouter(appRoutes),
    { provide: ORG_ID_TOKEN, useValue: environment.ORG_ID },
  ],
};
