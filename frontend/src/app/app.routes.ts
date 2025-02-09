import { Routes } from '@angular/router';
import { ContentComponent, DashboardComponent, HomeComponent, SignInComponent, SignUpComponent } from './pages';
import { AllTodosComponent } from './pages/all-todos/all-todos.component';
import { CreateTodoComponent } from './pages/create-todo/create-todo.component';
import { UpdateTodoComponent } from './pages/update-todo/update-todo.component';
import { authGuard, protectGuard, userResolver } from './core';
import { todosResolver } from './features';

export const routes: Routes = [
  { path: '', resolve: [userResolver], component: ContentComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'dashboard', canActivate: [protectGuard], resolve: [todosResolver], children: [
      { path: '', component: DashboardComponent },
      { path: 'todos', component: AllTodosComponent },
      { path: 'create-todo', component: CreateTodoComponent },
      { path: 'update-todo/:id', component: UpdateTodoComponent }
    ]}
  ]},
  { path: 'auth', canActivate: [authGuard], children: [
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent }
  ]}
];
