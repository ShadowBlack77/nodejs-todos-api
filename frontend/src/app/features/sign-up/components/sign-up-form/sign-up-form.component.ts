import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core';

@Component({
  selector: 'app-sign-up-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {

  private readonly authService: AuthService = inject(AuthService);

  public signUpForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  public onSubmit(): void {
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value);
    } else {
      console.log('Form is not valid!');
    }
  }
}
