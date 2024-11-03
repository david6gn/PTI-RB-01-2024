import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from "@angular/common/http";
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AuthInterceptorService } from '../service/auth-interceptor.service';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()), 
    provideHttpClient(withInterceptorsFromDi(),
  ),
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}, provideAnimationsAsync()
  ]
};
