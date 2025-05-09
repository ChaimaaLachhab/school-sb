import { ApplicationConfig, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { routes } from './app.routes';
import { provideClientHydration } from "@angular/platform-browser";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CarouselModule } from 'ngx-owl-carousel-o';

// Import PrimeNG modules that you plan to use
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideAnimationsAsync(),

    // Service pour PrimeNG
    MessageService,

    // Initialisation de AOS
    {
      provide: APP_INITIALIZER,
      useFactory: (document: Document) => {
        return () => {
          return import('aos').then(aos => {
            aos.init({
              once: false,
              duration: 1000,
              easing: 'ease'
            });
          });
        };
      },
      deps: [DOCUMENT],
      multi: true
    },

    // Import des modules nécessaires
    importProvidersFrom(
      // Angular Calendar
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory
      }),

      // Carousel
      CarouselModule,

      // PrimeNG modules
      ButtonModule,
      TableModule,
      DialogModule,
      ToastModule
    ), provideAnimationsAsync()
  ]
};
