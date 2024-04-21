import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MomsComponent } from './moms/moms.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MomsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'csc315-proj-website';
}
