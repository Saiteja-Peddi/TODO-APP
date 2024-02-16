import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class TaskInterceptor implements HttpInterceptor {
  constructor(private loading: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loading.show();

    const modifiedRequest = request.clone({
      headers: request.headers.set('Content-Type', 'application/json'), // Example header
    });

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        let defaultErrorMsg =
          'An unexpected error occurred. Please try again later.';
        if (error.error?.message) {
          defaultErrorMsg = error.error?.message;
        }

        return throwError(() => new Error(defaultErrorMsg));
      }),
      finalize(() => this.loading.hide())
    );
  }
}
