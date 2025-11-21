import { Injectable, OnDestroy } from '@angular/core';
import Lenis from 'lenis';

@Injectable({
  providedIn: 'root',
})
export class LenisService implements OnDestroy {
  private lenis: Lenis;

  constructor() {
    this.lenis = new Lenis({
      // options
    });

    this.raf(0);
  }

  ngOnDestroy() {
    this.lenis.destroy();
  }

  private raf(time: number) {
    this.lenis.raf(time);
    requestAnimationFrame((t) => this.raf(t));
  }
}
