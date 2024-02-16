import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TaskInterceptor } from './task.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TaskInterceptor, multi: true },
];
