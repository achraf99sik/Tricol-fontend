import { Injectable } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }

  public animateIn(element: HTMLElement) {
    gsap.fromTo(element, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
  }

  public animateOut(element: HTMLElement, onComplete: () => void) {
    gsap.to(element, { opacity: 0, y: -50, duration: 0.5, ease: 'power3.in', onComplete });
  }

  public staggerAnimateIn(elements: HTMLElement[]) {
    gsap.fromTo(elements, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' });
  }
}
