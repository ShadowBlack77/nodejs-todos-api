import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core';

@Component({
  selector: 'app-sign-in-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss'
})
export class SignInFormComponent {

  private readonly authService: AuthService = inject(AuthService);

  public signInForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public onSubmit(): void {
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value);
    } else {
      console.log('Form is not valid!');
    }
  }
}
