import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingScreenComponent } from './features';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LoadingScreenComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
