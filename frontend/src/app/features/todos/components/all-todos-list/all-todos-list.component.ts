import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TodosService } from '../../services';
import { map, Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-todos-list',
  imports: [
    RouterLink
  ],
  templateUrl: './all-todos-list.component.html',
  styleUrl: './all-todos-list.component.scss'
})
export class AllTodosListComponent implements OnInit, OnDestroy {

  private readonly todosService: TodosService = inject(TodosService);
  private readonly destroy$: Subject<void> = new Subject<void>();

  public todos: any[] = []

  ngOnInit(): void {
    this.todosService.todos$.asObservable().pipe(
      takeUntil(this.destroy$),
      map((res) => {
        this.todos = res;
      })
    ).subscribe();
  }

  public parseDate(date: Date): string {
    const createdAt = new Date(date);
  
    return `${createdAt.getDate() < 10 ? '0' + createdAt.getDate() : createdAt.getDate()}-${(createdAt.getMonth() + 1) < 10 ? '0' + (createdAt.getMonth() + 1) : (createdAt.getMonth() + 1)}-${createdAt.getFullYear()}`;
  }

  public complete(id: string, todoData: any): void {
    this.todosService.update(id, { ...todoData, isCompleted: !todoData.isCompleted });
  }

  public delete(id: string): void {
    this.todosService.delete(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
