import { ResolveFn } from '@angular/router';
import { TodosService } from '../services';
import { inject } from '@angular/core';

export const todosResolver: ResolveFn<boolean> = (route, state) => {

  const todosService: TodosService = inject(TodosService);

  todosService.getlAll();

  return true;
};
