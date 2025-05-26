import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

// const scrollConfig: InMemoryScrollingOptions = {
//   scrollPositionRestoration: 'top',
//   anchorScrolling: 'enabled',
// };

// const inMemoryScrollingFeature: InMemoryScrollingFeature =
//   withInMemoryScrolling(scrollConfig);


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations()]
};
