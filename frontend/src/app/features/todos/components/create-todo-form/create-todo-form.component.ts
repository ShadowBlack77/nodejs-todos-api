import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodosService } from '../../services';

@Component({
  selector: 'app-create-todo-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-todo-form.component.html',
  styleUrl: './create-todo-form.component.scss'
})
export class CreateTodoFormComponent {

  private readonly todosService: TodosService = inject(TodosService);

  public createTodo: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.createTodo = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  public onSubmit(): void {
    if (this.createTodo.valid) {
      this.todosService.create(this.createTodo.value);
    } else {
      console.log('Form is not valid!');
    }
  }
}
