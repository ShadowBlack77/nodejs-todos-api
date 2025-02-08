import { Routes } from '@angular/router';
import { ContentComponent, DashboardComponent, HomeComponent, SignInComponent, SignUpComponent } from './pages';
import { AllTodosComponent } from './pages/all-todos/all-todos.component';
import { CreateTodoComponent } from './pages/create-todo/create-todo.component';
import { UpdateTodoComponent } from './pages/update-todo/update-todo.component';

export const routes: Routes = [
  { path: '', component: ContentComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'todos', component: AllTodosComponent },
    { path: 'create-todo', component: CreateTodoComponent },
    { path: 'update-todo', component: UpdateTodoComponent }
  ]},
  { path: 'auth', children: [
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent }
  ]}
];
