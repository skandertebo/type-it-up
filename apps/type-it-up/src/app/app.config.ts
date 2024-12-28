import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { InMemoryCache } from '@apollo/client';
import { from } from '@apollo/client/core';
import { HttpLink } from '@apollo/client/link/http';
import { provideApollo } from 'apollo-angular';
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
  ],
};
