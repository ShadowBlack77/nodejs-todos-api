import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services';
import { map, Subject, takeUntil } from 'rxjs';
import { UserModel } from '../../models';

@Component({
  selector: 'app-auth-header',
  imports: [
    RouterLink
  ],
  templateUrl: './auth-header.component.html',
  styleUrl: './auth-header.component.scss'
})
export class AuthHeaderComponent implements OnInit, OnDestroy {

  private readonly authService: AuthService = inject(AuthService);
  private readonly destroy$: Subject<void> = new Subject<void>();

  public user: UserModel | undefined = undefined;

  ngOnInit(): void {
    this.authService.user$.asObservable().pipe(
      takeUntil(this.destroy$),
      map((user: any) => {
        this.user = user;
      })
    ).subscribe();
  }

  public singOut(): void {
    this.authService.signOut();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
