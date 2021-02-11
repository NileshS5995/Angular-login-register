import { AuthenticationService } from './../service/authentication.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
// import { AuthenticationService} from '../service/authentication.service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public authenticationService:AuthenticationService) {
    console.log('JWT interceptor constructor....')
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('JWT interceptor....')
    const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

    return next.handle(request);
  }
}
