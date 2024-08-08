import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MovieEffects } from './store/movie-store/effects';
import { MovieReducer } from './store/movie-store/reducer';
import { AuthReducer } from './store/auth-store/reducer';
import { AuthEffects } from './store/auth-store/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(),
    provideStore({ movie: MovieReducer, auth: AuthReducer }),
    provideEffects([MovieEffects, AuthEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false, trace: true }),
  ],
};
