import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductDto } from '../../interfaces/api.interface';
import { AnimationService } from '../../services/animation.service';

import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import gsap from 'gsap';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [RouterLink, CommonModule, LoadingSpinnerComponent],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  products: ProductDto[] = [];
  isLoading = true;

  @ViewChildren('productCard') productCards!: QueryList<ElementRef>;

  constructor(
    private api: ApiService,
    private animationService: AnimationService
  ) {}

  ngOnInit() {
    this.fetchProducts();
  }

  ngAfterViewInit() {
    // Animate initial items if they exist
    if (this.productCards.length > 0) {
      this.animateCards(this.productCards.map((c) => c.nativeElement));
    }

    this.productCards.changes.subscribe(() => {
      this.animateCards(this.productCards.map((c) => c.nativeElement));
    });
  }

  private animateCards(elements: HTMLElement[]) {
    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: 'power2.out' }
    );
  }

  fetchProducts() {
    this.isLoading = true;
    this.api.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure?')) {
      const card = this.productCards.find((c) => c.nativeElement.id === id);
      if (card) {
        gsap.to(card.nativeElement, {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          onComplete: () => {
            this.api.deleteProduct(id).subscribe(() => {
              this.products = this.products.filter((p) => p.id !== id);
            });
          },
        });
      }
    }
  }
}
