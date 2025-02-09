import { Component } from '@angular/core';
import { SignUpFormComponent } from '../../features/sign-up/components';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [
    SignUpFormComponent,
    RouterLink
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

}
