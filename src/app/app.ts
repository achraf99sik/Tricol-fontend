import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LenisService } from './services/lenis.service';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tricol-frontend');

  constructor(private lenisService: LenisService) {}
}
