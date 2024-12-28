import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { from, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from '@apollo/client/link/http';
import { ORG_ID_TOKEN } from '@type-it-up/shared';
import { provideApollo } from 'apollo-angular';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    provideApollo(() => ({
      cache: new InMemoryCache(),
      link: from([new HttpLink({ uri: 'http://localhost:3000/graphql' })]),
    })),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    { provide: ORG_ID_TOKEN, useValue: environment.ORG_ID },
  ],
};
