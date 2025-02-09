import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services';
import { inject } from '@angular/core';
import { catchError, map, of, take } from 'rxjs';
import { LoadingScreenService } from '../../../features';
import { HttpErrorResponse } from '@angular/common/http';
export const protectGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const loadingScreenService: LoadingScreenService = inject(LoadingScreenService);

  return authService.checkValidity().pipe(
    take(1),
    map(() => {

      return true;
    }),
    catchError((errorResponse: HttpErrorResponse) => {

      if (errorResponse.status === 401) {
        return authService.refreshToken().pipe(
          take(1),
          map(() => {
            return true;
          }),
          catchError(() => {
            router.navigate(['/']);
            loadingScreenService.hide();
            
            return of(false);
          })
        )
      }

      router.navigate(['/']);
      loadingScreenService.hide();

      return of(false);
    })
  )
};
