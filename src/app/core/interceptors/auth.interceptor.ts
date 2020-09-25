import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KEYS_CONSTANT } from '../../constants/keys.contstant';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem(KEYS_CONSTANT.accessToken);

    if (idToken) {

      const cloned = req.clone({
        headers: req.headers.set('Authorization', idToken)
      });

      return next.handle(cloned);

    } else {

      return next.handle(req);

    }

  }

}
