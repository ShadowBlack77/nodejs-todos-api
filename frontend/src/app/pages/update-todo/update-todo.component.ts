import { Component, Input } from '@angular/core';
import { UpdateTodoFormComponent } from '../../features';

@Component({
  selector: 'app-update-todo',
  imports: [
    UpdateTodoFormComponent
  ],
  templateUrl: './update-todo.component.html',
  styleUrl: './update-todo.component.scss'
})
export class UpdateTodoComponent {

  @Input() id!: string;
}
