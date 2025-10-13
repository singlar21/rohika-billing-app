import { inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../components/services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  let clonedReq = req;
  if (token) {
    clonedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(clonedReq);
};
