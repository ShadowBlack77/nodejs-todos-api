import { Component } from '@angular/core';
import { CreateTodoFormComponent } from '../../features';

@Component({
  selector: 'app-create-todo',
  imports: [
    CreateTodoFormComponent
  ],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss'
})
export class CreateTodoComponent {

}
