import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import Lenis from '@studio-freight/lenis';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {
    // 1. Initialize Smooth Scroll (Lenis)
    const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical', // CHANGED from 'direction'
    gestureOrientation: 'vertical', // Optional: limits touch gestures to vertical
    smoothWheel: true,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

    // 2. Intro Animations (GSAP)
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });

    // Animate Navbar down
    tl.from('.glass-nav', {
      y: -100,
      opacity: 0,
      duration: 1,
      delay: 0.2
    });

    // Reveal Main Title (Text slides up from masked div)
    tl.to('.hero-line', {
      y: 0,
      stagger: 0.15,
      duration: 1.2
    }, "-=0.5");

    // Fade in Badge, Description and Buttons
    tl.to(['.hero-badge', '.hero-desc', '.hero-btns'], {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 1
    }, "-=1");

    // Slight rotation interaction on mouse move for the 'Aurora' backgrounds
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        gsap.to('.aurora', {
            x: (clientX - centerX) * 0.05,
            y: (clientY - centerY) * 0.05,
            duration: 2,
            ease: 'power2.out'
        });
    });
  }
}
