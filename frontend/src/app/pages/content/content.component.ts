import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header';
import { AuthHeaderComponent } from '../../core';

@Component({
  selector: 'app-content',
  imports: [
    RouterOutlet,
    HeaderComponent,
    AuthHeaderComponent
],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent {

}
