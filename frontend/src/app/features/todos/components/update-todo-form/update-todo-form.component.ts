import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { TodosService } from '../../services';
import { map, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-todo-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-todo-form.component.html',
  styleUrl: './update-todo-form.component.scss'
})
export class UpdateTodoFormComponent implements OnInit, OnDestroy {

  @Input() id!: string;

  private readonly todosService: TodosService = inject(TodosService);
  private readonly destroy$: Subject<void> = new Subject<void>();

  public updateTodo: FormGroup;

  public todo: any;

  constructor(private readonly formBuilder: FormBuilder) {
    this.updateTodo = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.todosService.getOne(this.id);

    this.todosService.todo$.asObservable().pipe(
      takeUntil(this.destroy$),
      map((res: any) => {
        this.todo = res;

        if (res) {
          this.updateTodo.setValue({ title: res.title, content: res.content });
        }
      })
    ).subscribe();
  }

  public onSubmit(): void {
    if(this.updateTodo.valid) {
      this.todosService.update(this.todo._id, this.updateTodo.value);
    } else {
      console.log('form is not valid');
    }
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
