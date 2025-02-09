import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { BACKEND_URL } from '../../../core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly router: Router = inject(Router);

  public todos$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public todo$: BehaviorSubject<any | undefined> = new BehaviorSubject<any | undefined>(undefined);

  public getlAll(): void {
    this.httpClient.get(`${BACKEND_URL}/api/v1/todos/`).pipe(
      take(1),
      map((res: any) => {
        this.todos$.next(res.todos);
      })
    ).subscribe();
  }

  public getOne(id: string): void {
    this.httpClient.get(`${BACKEND_URL}/api/v1/todos/${id}`).pipe(
      take(1),
      map((res: any) => {
        this.todo$.next(res.todo[0]);
      })
    ).subscribe();
  }

  public create(todoData: any): void {
    this.httpClient.post(`${BACKEND_URL}/api/v1/todos/`, todoData).pipe(
      take(1),
      map(() => {
        this.getlAll();
        this.router.navigate(['/dashboard/todos']);
      })
    ).subscribe();
  }

  public update(id: string, todoData: any): void {
    this.httpClient.put(`${BACKEND_URL}/api/v1/todos/${id}`, todoData).pipe(
      take(1),
      map(() => {
        this.getlAll();
        this.router.navigate(['/dashboard/todos']);
      })
    ).subscribe();
  }

  public delete(id: string): void {
    this.httpClient.delete(`${BACKEND_URL}/api/v1/todos/${id}`).pipe(
      take(1),
      map(() => {
        this.getlAll()
      })
    ).subscribe();
  }
}
