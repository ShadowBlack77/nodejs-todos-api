import { Component } from '@angular/core';
import { SignInFormComponent } from '../../features';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [
    SignInFormComponent,
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

}
