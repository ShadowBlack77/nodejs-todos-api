import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services';
import { inject } from '@angular/core';
import { catchError, map, of, take } from 'rxjs';
import { LoadingScreenService } from '../../../features';
import { HttpErrorResponse } from '@angular/common/http';

export const authGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const loadingScreenService: LoadingScreenService = inject(LoadingScreenService);

  return authService.checkValidity().pipe(
    take(1),
    map(() => {
      router.navigate(['/']);

      return false;
    }),
    catchError((errorResponse: HttpErrorResponse) => {
      
      if (errorResponse.status === 401) {
        return authService.refreshToken().pipe(
          take(1),
          map(() => {
            router.navigate(['/']);

            return false;
          }),
          catchError(() => {
            loadingScreenService.hide();
            
            return of(true);
          })
        )
      }

      loadingScreenService.hide();

      return of(true);
    })
  );
};
