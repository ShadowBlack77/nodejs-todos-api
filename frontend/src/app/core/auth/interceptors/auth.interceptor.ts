import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services';
import { inject } from '@angular/core';
import { API_KEY } from '../../env';
import { Router } from '@angular/router';
import { catchError, switchMap, take, throwError } from 'rxjs';
import { LoadingScreenService } from '../../../features';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const loadingScreenService: LoadingScreenService = inject(LoadingScreenService);
  
  if (req.headers.has('x-bypass-interceptor')) {
    return next(req);
  }

  return authService.checkValidity().pipe(
    take(1),
    switchMap((res) => {
      const updatedRequest = req.clone({
        withCredentials: true,
        setHeaders: {
          'api-key': `${API_KEY}`,
        }
      });

      return next(updatedRequest);
    }), 
    catchError((errorResposne: HttpErrorResponse) => {

      if (errorResposne.status === 401) {
        return authService.refreshToken().pipe(
          take(1),
          switchMap(() => {
            const updatedRequest = req.clone({
              withCredentials: true,
              setHeaders: {
                'api-key': `${API_KEY}`,
              }
            });

            return next(updatedRequest);
          }),
          catchError(() => {
            router.navigate(['/']);
            loadingScreenService.hide();

            return throwError(() => new Error('Sessionexpired. User has been logged out'));
          })
        )
      }

      return throwError(() => errorResposne);
    })
  );
};
