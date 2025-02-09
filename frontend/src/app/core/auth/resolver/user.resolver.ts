import { ResolveFn } from '@angular/router';
import { AuthService } from '../services';
import { inject } from '@angular/core';

export const userResolver: ResolveFn<boolean> = (route, state) => {

  const authService: AuthService = inject(AuthService);

  authService.getProfile();

  return true;
};
