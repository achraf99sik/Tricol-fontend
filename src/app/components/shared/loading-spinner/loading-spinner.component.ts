import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex justify-center items-center py-20">
      <div class="relative w-16 h-16">
        <div
          class="absolute top-0 left-0 w-full h-full border-4 border-white/10 rounded-full"
        ></div>
        <div
          class="absolute top-0 left-0 w-full h-full border-4 border-[#d1f83b] rounded-full animate-spin border-t-transparent"
        ></div>
      </div>
    </div>
  `,
})
export class LoadingSpinnerComponent {}
