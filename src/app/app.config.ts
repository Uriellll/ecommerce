import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { appReducers } from './store/app.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { catchErrorInterceptor } from './shared/interceptors/catch-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor, catchErrorInterceptor])),
    provideStore(appReducers),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
