import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { timeout, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  private readonly REQUEST_TIMEOUT = 5000;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken()
    if(token !== '') {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned).pipe(
        timeout(this.REQUEST_TIMEOUT),
        catchError((error) => {
          console.error('Request timed out', error);
          throw error;
        })
      );
    }
    return next.handle(req).pipe(
      timeout(this.REQUEST_TIMEOUT),
      catchError((error) => {
        console.error('Request timed out', error);
        throw error;
      })
    );
  }
}
