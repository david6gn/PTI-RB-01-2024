import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  private token: string;
  constructor(authService: AuthService) {
    this.token = authService.getToken();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
