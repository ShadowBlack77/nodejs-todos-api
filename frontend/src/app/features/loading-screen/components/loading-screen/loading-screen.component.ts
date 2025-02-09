import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LoadingScreenService } from '../../services';
import { map, Subject, takeUntil } from 'rxjs';
import gsap from 'gsap';

@Component({
  selector: 'app-loading-screen',
  imports: [],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss'
})
export class LoadingScreenComponent implements OnInit, OnDestroy {

  private readonly loadingScreenService: LoadingScreenService = inject(LoadingScreenService);
  private readonly destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.loadingScreenService.loadingScreenState$.pipe(
      takeUntil(this.destroy$),
      map((res) => {
        if (res) {
          gsap.to('.loading-screen', {
            opacity: 1,
            zIndex: 9999,
            duration: 0.5,
            delay: 0.25,
            ease: 'power2.inOut'
          })
        } else {
          gsap.to('.loading-screen', {
            opacity: 0,
            zIndex: -1,
            duration: 0.5,
            delay: 0.25,
            ease: 'power2.inOut'
          })
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
