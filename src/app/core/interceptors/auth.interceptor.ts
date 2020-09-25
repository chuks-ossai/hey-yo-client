import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { KEYS_CONSTANT } from '../../constants/keys.contstant';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem(KEYS_CONSTANT.accessToken);

    if (idToken) {

      const cloned = req.clone({
        headers: req.headers.set('Authorization', idToken)
      });

      return next.handle(cloned).pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              window.history.back();
            }
          }
          return throwError(err);
        }) as any
      );

    } else {

      return next.handle(req);

    }

  }

}
