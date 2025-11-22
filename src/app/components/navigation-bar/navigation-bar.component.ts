import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation-bar.component.html',
})
export class NavigationBarComponent implements AfterViewInit {
  @ViewChild('menuButton') menuButton!: ElementRef;
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;

  ngAfterViewInit() {
    if (this.menuButton?.nativeElement && this.mobileMenu?.nativeElement) {
      this.menuButton.nativeElement.addEventListener('click', () => {
        this.mobileMenu.nativeElement.classList.toggle('hidden');
      });
    }
  }
}
