import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignInModel, SignUpModel, UserModel } from '../models';
import { BehaviorSubject, catchError, map, Observable, take, throwError } from 'rxjs';
import { API_KEY, BACKEND_URL } from '../../env';
import { Router } from '@angular/router';
import { LoadingScreenService } from '../../../features';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly router: Router = inject(Router);
  private readonly loadingScreenService: LoadingScreenService = inject(LoadingScreenService);
  private readonly bypassInterceptor: HttpHeaders = new HttpHeaders({
    'x-bypass-interceptor': 'true',
    'api-key': `${API_KEY}`
  });

  public readonly user$: BehaviorSubject<UserModel | undefined> = new BehaviorSubject<UserModel | undefined>(undefined);

  public signIn(signInCredentials: SignInModel) {
    this.httpClient.post(`${BACKEND_URL}/api/v1/auth/sign-in`, signInCredentials, {
      withCredentials: true,
      headers: this.bypassInterceptor
    }).pipe(
      take(1),
      map((res: any) => {
        this.user$.next(res);
        this.router.navigate(['/']);
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return throwError(() => errorResponse);
      })
    ).subscribe();
  }

  public signUp(signUpCredentials: SignUpModel) {
    this.httpClient.post(`${BACKEND_URL}/api/v1/auth/sign-up`, signUpCredentials, {
      withCredentials: true,
      headers: this.bypassInterceptor
    }).pipe(
      take(1),
      map(() => {
        this.router.navigate(['/auth/sign-in']);
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return throwError(() => errorResponse);
      })
    ).subscribe();
  }

  public signOut() {
    this.httpClient.post(`${BACKEND_URL}/api/v1/auth/sign-out`, {
      content: 'Sign Out'
    }).pipe(
      take(1),
      map(() => {
        this.user$.next(undefined);
        this.router.navigate(['/']);
      })
    ).subscribe();
  }

  public getProfile() {
    this.httpClient.get(`${BACKEND_URL}/api/v1/auth/profile`).pipe(
      take(1),
      map((res: any) => {
        this.user$.next(res.user);
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return throwError(() => errorResponse)
      })
    ).subscribe();
  }

  public checkValidity(): Observable<unknown> {
    this.loadingScreenService.show();

    return this.httpClient.get(`${BACKEND_URL}/api/v1/auth/check-validity`, { 
      withCredentials: true,
      headers: this.bypassInterceptor
    }).pipe(
      take(1),
      map(() => {
        this.loadingScreenService.hide();
      })
    );
  }

  public refreshToken(): Observable<unknown> {
    return this.httpClient.post(`${BACKEND_URL}/api/v1/auth/refresh-token`, { 
      content: 'refresh token' 
    }, { 
      withCredentials: true,
      headers: this.bypassInterceptor
    }).pipe(
      take(1)
    );
  }
}
