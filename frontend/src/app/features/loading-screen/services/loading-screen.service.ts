import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {

  public loadingScreenState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public show(): void {
    this.loadingScreenState$.next(true);
  } 

  public hide(): void {
    this.loadingScreenState$.next(false);
  } 
}
